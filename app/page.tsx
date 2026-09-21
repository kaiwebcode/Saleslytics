"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

import { useSales } from "@/hooks/use-sales";

import { SalesSidebar } from "@/components/sales/sales-sidebar";
import { SalesHeader } from "@/components/sales/sales-header";
import { UploadDropzone } from "@/components/sales/upload-dropzone";
import { UploadFeedback } from "@/components/sales/upload-feedback";
import { SalesKpiGrid } from "@/components/sales/sales-kpi-grid";
import { SalesChart } from "@/components/sales/sales-chart";
import { SalesRecords } from "@/components/sales/sales-records";

export default function Home() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const sales = useSales();

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File) => {
    void sales.handleUpload(file);
  };

  const hasData = sales.records.length > 0;

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex min-h-screen">
        <SalesSidebar
          onImport={openFilePicker}
        />

        <div className="min-w-0 flex-1">
          <SalesHeader
            loading={sales.loading}
            uploading={sales.uploading}
            onRefresh={() => void sales.fetchSales()}
            onImport={openFilePicker}
          />

          <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 md:p-6">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Retail performance
                  </h1>

                  {hasData && (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {sales.records.length.toLocaleString(
                        "en-IN",
                      )}{" "}
                      records
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Analyze sales performance across retailers
                  and products.
                </p>
              </div>

              {hasData && (
                <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                  <BarChart3 className="size-4" />
                  Live filtered analytics
                </div>
              )}
            </motion.section>

            <UploadFeedback
              error={sales.error}
              uploadResult={sales.uploadResult}
            />

            {!hasData && !sales.loading && (
              <UploadDropzone
                uploading={sales.uploading}
                onBrowse={openFilePicker}
                onFile={handleFile}
              />
            )}

            {hasData && (
              <>
                <SalesKpiGrid
                  summary={sales.summary}
                />

                <SalesChart
                  data={sales.chartData}
                />

                <SalesRecords
                  records={sales.filteredRecords}
                  loading={sales.loading}
                  search={sales.search}
                  setSearch={sales.setSearch}
                  startDate={sales.startDate}
                  setStartDate={sales.setStartDate}
                  endDate={sales.endDate}
                  setEndDate={sales.setEndDate}
                  retailer={sales.retailer}
                  setRetailer={sales.setRetailer}
                  product={sales.product}
                  setProduct={sales.setProduct}
                  retailers={sales.retailers}
                  products={sales.products}
                  hasFilters={sales.hasFilters}
                  onResetFilters={sales.resetFilters}
                  onExport={sales.exportCSV}
                />
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (file) {
                  handleFile(file);
                }

                event.target.value = "";
              }}
            />

            <footer className="border-t pt-6 text-center text-xs text-muted-foreground">
              Saleslytics · CSV Sales Analysis
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}