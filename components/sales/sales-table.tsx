"use client";

import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { SalesRecord } from "@/types/sales";
import {
  formatDate,
  money,
  sellingPrice,
} from "@/lib/sales-utils";

type SalesTableProps = {
  records: SalesRecord[];
  loading: boolean;
};

export function SalesTable({
  records,
  loading,
}: SalesTableProps) {
  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
        <p className="font-medium">
          No sales records found
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your filters or upload another CSV
          file.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Retailer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">
              Quantity
            </TableHead>
            <TableHead className="text-right">
              Regular Price
            </TableHead>
            <TableHead className="text-right">
              Promo Price
            </TableHead>
            <TableHead className="text-right">
              Sales Value
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.map((record, index) => {
            const salesValue =
              Number(record.quantity) *
              sellingPrice(record);

            return (
              <TableRow
                key={`${record.date}-${record.retailer}-${record.product}-${index}`}
              >
                <TableCell className="whitespace-nowrap">
                  {formatDate(record.date)}
                </TableCell>

                <TableCell className="font-medium">
                  {record.retailer}
                </TableCell>

                <TableCell>
                  {record.product}
                </TableCell>

                <TableCell className="text-right">
                  {Number(record.quantity).toLocaleString(
                    "en-IN",
                  )}
                </TableCell>

                <TableCell className="text-right">
                  {money(Number(record.regularPrice))}
                </TableCell>

                <TableCell className="text-right">
                  {record.promotionPrice !== null
                    ? money(
                        Number(record.promotionPrice),
                      )
                    : "—"}
                </TableCell>

                <TableCell className="text-right font-medium">
                  {money(salesValue)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}