import { SubCategoryInstance } from "./sub-category";

export interface AddSubCategoryParams {
    name: string;
  }

  export interface SubCategoryUpdateParams{
    name: string
    updated_by: bigint
  }

  export interface SubCategoryListQueryParams {
    q?: string;
    page?: number;
    per_page?: number;
    name?:string;
  }
  
  export interface SubCategoryRowsAndCount {
    count: number;
    rows: SubCategoryInstance[];
  }