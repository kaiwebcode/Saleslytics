"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { money, shortDate } from "@/lib/sales-utils";

type SalesChartProps = {
  data: {
    date: string;
    sales: number;
  }[];
};

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SalesChart({
  data,
}: SalesChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            Sales performance
          </CardTitle>

          <CardDescription>
            Daily sales value for the current filters
          </CardDescription>
        </CardHeader>

        <CardContent>
          {data.length === 0 ? (
            <div className="flex h-80 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No sales data available for the selected
              filters.
            </div>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="h-80 w-full"
            >
              <LineChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 8,
                  right: 12,
                  top: 8,
                  bottom: 8,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={28}
                  tickFormatter={shortDate}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        money(Number(value))
                      }
                    />
                  }
                />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                  }}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}