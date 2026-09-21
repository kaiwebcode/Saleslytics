
import type {
  SalesRecord,
  SalesSummary,
} from "@/types/sales";

export function calculateSummary(
  records: SalesRecord[]
): SalesSummary {
  const totalQuantity = records.reduce(
    (sum, record) => sum + record.quantity,
    0
  );

  const totalSales = records.reduce(
    (sum, record) =>
      sum +
      record.quantity *
        (record.promotionPrice ?? record.regularPrice),
    0
  );

  const averageSellingPrice =
    totalQuantity > 0
      ? totalSales / totalQuantity
      : 0;

  const regularValue = records.reduce(
    (sum, record) =>
      sum + record.quantity * record.regularPrice,
    0
  );

  const promotionValue = records.reduce(
    (sum, record) =>
      sum +
      record.quantity *
        (record.promotionPrice ?? record.regularPrice),
    0
  );

  const promotionPercentage =
    regularValue > 0
      ? ((regularValue - promotionValue) /
          regularValue) *
        100
      : 0;

  return {
    totalQuantity,
    totalSales,
    averageSellingPrice,
    promotionPercentage,
  };
}