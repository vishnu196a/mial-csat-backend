import { ManagerReportInstance } from "./manager-report";

export interface ManagerReportListQueryParams {
  q?: string;
  page?: number;
  name?: string;
  per_page?: number;
  handler_name?: string;
}

export interface ManagerReportRowsAndCount {
  count: number;
  rows: ManagerReportInstance[];
}
