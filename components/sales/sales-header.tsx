"use client";

import {
  Download,
  RefreshCw,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type SalesHeaderProps = {
  loading: boolean;
  uploading: boolean;
  onRefresh: () => void;
  onImport: () => void;
};

export function SalesHeader({
  loading,
  uploading,
  onRefresh,
  onImport,
}: SalesHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur-xl md:px-6">
      <div>
        <p className="text-sm font-semibold">
          Sales Overview
        </p>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Monitor your retail performance
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/sample-sales.csv"
          download="sample-sales.csv"
          className="hidden h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
        >
          <Download className="mr-2 size-4" />
          Sample
        </a>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading || uploading}
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              loading ? "animate-spin" : ""
            }`}
          />

          <span className="hidden sm:inline">
            Refresh
          </span>
        </Button>

        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            size="sm"
            onClick={onImport}
            disabled={uploading}
          >
            <Upload className="mr-2 size-4" />
            Import CSV
          </Button>
        </motion.div>
      </div>
    </header>
  );
}