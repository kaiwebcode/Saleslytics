export type SalesRecord = {
  date: string;
  retailer: string;
  product: string;
  quantity: number;
  regularPrice: number;
  promotionPrice: number | null;
};

export type SalesSummary = {
  totalQuantity: number;
  totalSales: number;
  averageSellingPrice: number;
  promotionPercentage: number;
};