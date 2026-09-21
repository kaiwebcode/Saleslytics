"use client";

import { Download, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { SalesRecord } from "@/types/sales";

import { SalesFilters } from "./sales-filters";
import { SalesTable } from "./sales-table";

type SalesRecordsProps = {
  records: SalesRecord[];
  loading: boolean;

  search: string;
  setSearch: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  retailer: string;
  setRetailer: (value: string) => void;

  product: string;
  setProduct: (value: string) => void;

  retailers: string[];
  products: string[];

  hasFilters: boolean;
  onResetFilters: () => void;
  onExport: () => void;
};

export function SalesRecords({
  records,
  loading,
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
  hasFilters,
  onResetFilters,
  onExport,
}: SalesRecordsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>
              Sales records
            </CardTitle>

            <CardDescription className="mt-1">
              Review and filter your imported sales data.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {records.length.toLocaleString("en-IN")} records
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              disabled={!records.length}
            >
              <Download className="mr-2 size-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>

        <SalesFilters
          search={search}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          retailer={retailer}
          setRetailer={setRetailer}
          product={product}
          setProduct={setProduct}
          retailers={retailers}
          products={products}
          hasFilters={hasFilters}
          onReset={onResetFilters}
        />

        <CardContent className="p-0">
          <SalesTable
            records={records}
            loading={loading}
          />
        </CardContent>

        <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
          <FileSpreadsheet className="size-3.5" />
          Showing the currently filtered dataset.
        </div>
      </Card>
    </motion.div>
  );
}