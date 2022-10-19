import { ExtensionTypeInstance } from "./extension-type";

export interface AddExtensionTypeParams {
  type: string;
  extension: string;
}

export interface ExtensionTypeListQueryParams {
  q?: string;
  page?: number;
  type?: string;
  per_page?: number;
  extension?: string;
}

export interface ExtensionTypeRowsAndCount {
  count: number;
  rows: ExtensionTypeInstance[];
}

export interface ExtensionTypeUpdateParams {
  type: string;
  extension: string;
}
