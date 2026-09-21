"use client";

import { BarChart3, FileSpreadsheet, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

type SalesSidebarProps = {
  onImport: () => void;
};

export function SalesSidebar({
  onImport,
}: SalesSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <BarChart3 className="size-5" />
        </div>

        <div>
          <p className="font-semibold tracking-tight">
            Saleslytics
          </p>
          <p className="text-xs text-muted-foreground">
            CSV Analytics
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center gap-3 rounded-xl bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary"
        >
          <LayoutDashboard className="size-4" />
          Overview
        </motion.button>

        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onImport}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FileSpreadsheet className="size-4" />
          Import CSV
        </motion.button>
      </nav>

      <div className="p-4">
        <div className="rounded-2xl border bg-muted/40 p-4">
          <p className="text-sm font-medium">
            Sales insights
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Upload your sales data and explore performance
            across products and retailers.
          </p>
        </div>
      </div>
    </aside>
  );
}