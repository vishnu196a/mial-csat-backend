import { CategoryInstance } from "./category";

export interface AddCategoryParams {
  name: string;
}

export interface CategoryListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
  name?:string;
}

export interface CategoryRowsAndCount {
  count: number;
  rows: CategoryInstance[];
}

export interface CategoryUpdateParams{
  name: string
  updated_by: bigint
}