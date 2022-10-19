import { DynamicReportTemplateInstance } from "./dynamic-report-template";

export interface DynamicReportTemplateListQueryParams {
  q?: string;
  page?: number;
  name?: string;
  per_page?: number;
}

export interface DynamicReportTemplateRowsAndCount {
  count: number;
  rows: DynamicReportTemplateInstance[];
}

export interface AddDynamicReportTemplateParams {
  name: string;
  payload: object;
}