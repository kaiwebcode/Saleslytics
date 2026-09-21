"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type UploadDropzoneProps = {
  uploading: boolean;
  onBrowse: () => void;
  onFile: (file: File) => void;
};

export function UploadDropzone({
  uploading,
  onBrowse,
  onFile,
}: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer.files?.[0];

        if (file) {
          onFile(file);
        }
      }}
      className={[
        "rounded-3xl border-2 border-dashed p-8 text-center transition-all sm:p-12",
        dragging
          ? "scale-[1.01] border-primary bg-primary/5"
          : "border-muted-foreground/20 bg-muted/20",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <motion.div
          animate={{
            y: dragging ? -5 : 0,
            scale: dragging ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          {dragging ? (
            <UploadCloud className="size-8" />
          ) : (
            <FileSpreadsheet className="size-8" />
          )}
        </motion.div>

        <h2 className="text-xl font-semibold tracking-tight">
          Upload your sales CSV
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Drag and drop your CSV file here, or browse your computer. Maximum
          file size is 5MB.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <Button onClick={onBrowse} disabled={uploading}>
            <UploadCloud className="mr-2 size-4" />
            Choose CSV file
          </Button>

          <a
            href="/sample-sales.csv"
            download="sample-sales.csv"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="mr-2 size-4" />
            Download sample
          </a>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Required columns: Date, Retailer, Product, Quantity, Regular Price,
          Promotion Price
        </p>
      </div>
    </motion.div>
  );
}
