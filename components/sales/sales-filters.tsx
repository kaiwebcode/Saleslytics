"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SalesFiltersProps = {
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
  onReset: () => void;
};

export function SalesFilters({
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
  onReset,
}: SalesFiltersProps) {
  return (
    <div className="border-b bg-muted/20 p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Input
          placeholder="Search retailer or product..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <Input
          type="date"
          value={startDate}
          onChange={(event) =>
            setStartDate(event.target.value)
          }
        />

        <Input
          type="date"
          value={endDate}
          onChange={(event) =>
            setEndDate(event.target.value)
          }
        />

        <Select
          value={retailer || "all"}
          onValueChange={(value) => {
            if (value === null) return;

            setRetailer(
              value === "all" ? "" : value,
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Retailer" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All retailers
            </SelectItem>

            {retailers.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={product || "all"}
          onValueChange={(value) => {
            if (value === null) return;

            setProduct(
              value === "all" ? "" : value,
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Product" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All products
            </SelectItem>

            {products.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
          >
            <X className="mr-2 size-4" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}