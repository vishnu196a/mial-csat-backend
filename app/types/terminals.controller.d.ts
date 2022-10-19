import { TerminalInstance } from './';

export interface AddTerminalParams {
  name: string;
}

export interface TerminalListQueryParams {
  q?: string;
  name?: string;
  page?: number;
  per_page?: number;
}

export interface TerminalRowsAndCount {
  count: number;
  rows: TerminalInstance[];
}

export interface TerminalUpdateParams {
  name: string;
}
