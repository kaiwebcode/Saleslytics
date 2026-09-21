"use client";

import {
  BadgePercent,
  CircleDollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

import type { SalesSummary } from "@/types/sales";
import { money } from "@/lib/sales-utils";
import { SalesKpiCard } from "./sales-kpi-card";

type SalesKpiGridProps = {
  summary: SalesSummary;
};

export function SalesKpiGrid({
  summary,
}: SalesKpiGridProps) {
  const cards = [
    {
      title: "Total Quantity",
      value: summary.totalQuantity.toLocaleString("en-IN"),
      description: "Units sold in current view",
      icon: Package,
    },
    {
      title: "Total Sales Value",
      value: money(summary.totalSales),
      description: "Revenue from filtered sales",
      icon: CircleDollarSign,
    },
    {
      title: "Average Selling Price",
      value: money(summary.averageSellingPrice),
      description: "Average realized price per unit",
      icon: TrendingUp,
    },
    {
      title: "Promotion Percentage",
      value: `${summary.promotionPercentage.toFixed(1)}%`,
      description: "Sales value discounted",
      icon: BadgePercent,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card, index) => (
        <SalesKpiCard
          key={card.title}
          {...card}
          index={index}
        />
      ))}
    </motion.section>
  );
}