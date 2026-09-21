"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SalesKpiCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  index: number;
};

export function SalesKpiCard({
  title,
  value,
  description,
  icon: Icon,
  index,
}: SalesKpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="relative h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/[0.04]" />

        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>

          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-2xl font-semibold tracking-tight">
            {value}
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}