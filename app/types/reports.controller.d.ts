import { CategoryInstance } from "./category";

export interface CategoryReportListQueryParams {
  q?: string;
  to?: string;
  page?: number;
  name?: string;
  from?: string;
  count?: string;
  o_name?: string;
  o_count?: string;
  per_page?: number;
}

export interface CategoryReportRowsAndCount {
  count: number;
  rows: CategoryInstance[];
}

export interface SubCategoryReportListQueryParams {
  q?: string;
  to: string;
  page?: number;
  name?: string;
  from: string;
  count?: string;
  o_name?: string;
  o_count?: string;
  per_page?: number;
}

export interface SubCategoryTopThreeListQueryParams {
  to: string;
  from: string;
}

export interface CategoryReportDownloadQueryParams {
  to: string;
  from: string;
}

export interface SubCategoryReportDownloadQueryParams {
  to: string;
  from: string;
}

export interface ChartQueryParams {
  to: string;
  from: string;
}

export interface subCategoryQueryParams {
  to: string;
  from: string;
}
