import { NextResponse } from "next/server";
import Papa from "papaparse";

import { saveSalesRecords } from "@/lib/storage";
import type { SalesRecord } from "@/types/sales";

const requiredHeaders = [
  "Date",
  "Retailer",
  "Product",
  "Quantity",
  "Regular Price",
  "Promotion Price",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload a CSV file." },
        { status: 400 },
      );
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        { error: "Only CSV files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be smaller than 5 MB." },
        { status: 400 },
      );
    }

    const text = await file.text();

    const parsed = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    const headers = parsed.meta.fields ?? [];

    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header),
    );

    if (missingHeaders.length > 0) {
      return NextResponse.json(
        {
          error: "CSV is missing required columns.",
          missingHeaders,
        },
        { status: 400 },
      );
    }

    const validRecords: SalesRecord[] = [];
    const errors: { row: number; message: string }[] = [];

    parsed.data.forEach((row, index) => {
      const rowNumber = index + 2;

      const date = row.Date?.trim();
      const retailer = row.Retailer?.trim();
      const product = row.Product?.trim();

      const quantity = Number(row.Quantity);
      const regularPrice = Number(row["Regular Price"]);

      const promoText = row["Promotion Price"]?.trim();

      const promotionPrice =
        promoText === "" || promoText === undefined
          ? null
          : Number(promoText);

      const validDate =
        /^\d{4}-\d{2}-\d{2}$/.test(date ?? "") &&
        !Number.isNaN(
          Date.parse(`${date}T00:00:00Z`),
        ) &&
        new Date(`${date}T00:00:00Z`)
          .toISOString()
          .startsWith(date ?? "");

      const problems: string[] = [];

      if (!validDate) {
        problems.push("Invalid date");
      }

      if (!retailer) {
        problems.push("Missing retailer");
      }

      if (!product) {
        problems.push("Missing product");
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        problems.push(
          "Quantity must be a positive integer",
        );
      }

      if (
        !Number.isFinite(regularPrice) ||
        regularPrice <= 0
      ) {
        problems.push(
          "Regular price must be positive",
        );
      }

      if (
        promotionPrice !== null &&
        (!Number.isFinite(promotionPrice) ||
          promotionPrice < 0 ||
          promotionPrice > regularPrice)
      ) {
        problems.push(
          "Promotion price must be between zero and regular price",
        );
      }

      if (problems.length > 0) {
        errors.push({
          row: rowNumber,
          message: problems.join(", "),
        });

        return;
      }

      validRecords.push({
        date: date!,
        retailer: retailer!,
        product: product!,
        quantity,
        regularPrice,
        promotionPrice,
      });
    });

    if (validRecords.length === 0) {
      return NextResponse.json(
        {
          error: "No valid sales rows found.",
          errors,
        },
        { status: 400 },
      );
    }

    saveSalesRecords(validRecords);

    return NextResponse.json({
      message: "CSV processed successfully.",
      imported: validRecords.length,
      rejected: errors.length,
      errors,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process CSV file." },
      { status: 500 },
    );
  }
}