"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

import type { SalesRecord, SalesSummary } from "@/types/sales";
import { sellingPrice } from "@/lib/sales-utils";

export type UploadResult = {
  imported: number;
  rejected: number;
  errors: {
    row: number;
    message: string;
  }[];
};

export function useSales() {
  const [records, setRecords] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [retailer, setRetailer] = useState("");
  const [product, setProduct] = useState("");

  const [uploadResult, setUploadResult] =
    useState<UploadResult | null>(null);

  const [error, setError] = useState("");

  const fetchSales = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/sales", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load sales records.");
      }

      const data = await response.json();

      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading sales.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSales();
  }, [fetchSales]);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");
      setUploadResult(null);

      try {
        if (!file.name.toLowerCase().endsWith(".csv")) {
          throw new Error("Please upload a CSV file.");
        }

        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            "File size must be less than 5MB.",
          );
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          if (result.errors?.length) {
            const errorDetails = result.errors
              .slice(0, 5)
              .map(
                (item: { row: number; message: string }) =>
                  `Row ${item.row}: ${item.message}`,
              )
              .join(" | ");

            throw new Error(
              `${result.error || "Upload failed."} ${errorDetails}`,
            );
          }

          throw new Error(
            result.error || "Upload failed.",
          );
        }

        setUploadResult(result);

        setSearch("");
        setStartDate("");
        setEndDate("");
        setRetailer("");
        setProduct("");

        await fetchSales();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while uploading the file.",
        );
      } finally {
        setUploading(false);
      }
    },
    [fetchSales],
  );

  const retailers = useMemo(
    () =>
      Array.from(
        new Set(records.map((record) => record.retailer)),
      ).sort(),
    [records],
  );

  const products = useMemo(
    () =>
      Array.from(
        new Set(records.map((record) => record.product)),
      ).sort(),
    [records],
  );

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !query ||
        record.retailer.toLowerCase().includes(query) ||
        record.product.toLowerCase().includes(query);

      const matchesStart =
        !startDate || record.date >= startDate;

      const matchesEnd =
        !endDate || record.date <= endDate;

      const matchesRetailer =
        !retailer || record.retailer === retailer;

      const matchesProduct =
        !product || record.product === product;

      return (
        matchesSearch &&
        matchesStart &&
        matchesEnd &&
        matchesRetailer &&
        matchesProduct
      );
    });
  }, [
    records,
    search,
    startDate,
    endDate,
    retailer,
    product,
  ]);

  const summary = useMemo<SalesSummary>(() => {
    let totalQuantity = 0;
    let totalSales = 0;
    let promotionSales = 0;
    let regularSales = 0;

    for (const record of filteredRecords) {
      const quantity = Number(record.quantity);

      const regularValue =
        quantity * Number(record.regularPrice);

      const sellingValue =
        quantity * sellingPrice(record);

      totalQuantity += quantity;
      totalSales += sellingValue;
      regularSales += regularValue;

      if (record.promotionPrice !== null) {
        promotionSales +=
          regularValue - sellingValue;
      }
    }

    const averageSellingPrice =
      totalQuantity > 0
        ? totalSales / totalQuantity
        : 0;

    const promotionPercentage =
      regularSales > 0
        ? (promotionSales / regularSales) * 100
        : 0;

    return {
      totalQuantity,
      totalSales,
      averageSellingPrice,
      promotionPercentage,
    };
  }, [filteredRecords]);

  const chartData = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const record of filteredRecords) {
      const value =
        Number(record.quantity) *
        sellingPrice(record);

      grouped.set(
        record.date,
        (grouped.get(record.date) ?? 0) + value,
      );
    }

    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, sales]) => ({
        date,
        sales,
      }));
  }, [filteredRecords]);

  const hasFilters =
    Boolean(search) ||
    Boolean(startDate) ||
    Boolean(endDate) ||
    Boolean(retailer) ||
    Boolean(product);

  const resetFilters = useCallback(() => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setRetailer("");
    setProduct("");
  }, []);

  const exportCSV = useCallback(() => {
    if (!filteredRecords.length) return;

    const csv = Papa.unparse(filteredRecords);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "sales-filtered-results.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }, [filteredRecords]);

  return {
    records,
    filteredRecords,
    loading,
    uploading,

    search,
    setSearch,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    retailer,
    setRetailer,

    product,
    setProduct,

    retailers,
    products,

    summary,
    chartData,

    uploadResult,
    error,

    hasFilters,

    handleUpload,
    fetchSales,
    resetFilters,
    exportCSV,
  };
}