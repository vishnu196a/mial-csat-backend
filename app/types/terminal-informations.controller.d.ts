import { TerminalInformationInstance } from './terminal-information';

export interface TerminalInformationRowsAndCount {
  count: number;
  rows: TerminalInformationInstance[];
}

export interface TerminalInformationListQueryParams {
  q?: string;
  page?: number;
  phone?: string;
  email?: string;
  category?: string;
  per_page?: number;
  location?: string;
  shop_name?: string;
  description?: string;
  terminal_name?: string;
}

export interface AddTerminalInformationParams {
  phone: string;
  email: string;
  category: string;
  location: string;
  shop_name: string;
  terminal_id: number;
  description?: string;
}

export interface TerminalInformationUpdateParams {
  phone: string;
  email: string;
  category: string;
  location: string;
  shop_name: string;
  terminal_id: number;
  description: string;
}
