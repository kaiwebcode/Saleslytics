import type { SalesRecord } from "@/types/sales";

declare global {

  var salesRecords: SalesRecord[] | undefined;
}

const globalStorage = globalThis as typeof globalThis & {
  salesRecords?: SalesRecord[];
};

if (!globalStorage.salesRecords) {
  globalStorage.salesRecords = [];
}

export function getSalesRecords(): SalesRecord[] {
  return globalStorage.salesRecords ?? [];
}

export function saveSalesRecords(records: SalesRecord[]) {
  globalStorage.salesRecords = [
    ...(globalStorage.salesRecords ?? []),
    ...records,
  ];
}