import { ContentManagementSystemInstance } from "./content-management-system";

export interface AddContentManagementSystemParams {
  title: string;
  content: string;
}

export interface ContentManagementSystemListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
  title?: string;
  created_by_name?: string;
}

export interface ContentManagementSystemRowsAndCount {
  count: number;
  rows: ContentManagementSystemInstance[];
}

export interface ContentManagementSystemUpdateParams {
  title: string;
  content: string;
}
