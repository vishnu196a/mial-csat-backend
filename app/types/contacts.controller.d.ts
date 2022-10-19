import { ContactInstance } from './';

export interface AddContactParams {
  name: string;
  email: string;
  phone: string | null;
  terminal_id: number;
  category_id: number;
  landline_number: string | null;
  sub_category_id: number;
}

export interface ContactUpdateParams {
  name: string;
  phone: string;
  email: string;
  terminal_id: number;
  category_id: number;
  sub_category_id: number;
  landline_number: string;
}

export interface ContactListQueryParams {
  q?: string;
  name?: string;
  page?: number;
  email?: string;
  per_page?: number;
  mobile_no?: string | null;
  terminal_name?: string;
  category_name?: string;
  created_by_name?: string;
  landline_number?: string | null;
  sub_category_name?: string;
}

export interface ContactRowsAndCount {
  count: number;
  rows: ContactInstance[];
}
