import { CallEntryInstance } from "./call-entry";

export interface AbandonedCallsListQueryParams {
  q?: string;
  to?: string;
  from?: string;
  page?: number;
  per_page?: number;
  contact_number?: string;
  call_reference_number?: string;
  type_of_called_back_queue?: string;
}

export interface AbandonedCallRowsAndCount {
  count: number;
  rows: CallEntryInstance[];
}

export interface CallbackQueueListQueryParams {
  q?: string;
  to?: string;
  from?: string;
  page?: number;
  per_page?: number;
  contact_number?: string;
  call_reference_number?: string;
}

export interface CalledbackQueueListQueryParams {
  q?: string;
  to?: string;
  from?: string;
  page?: number;
  per_page?: number;
  contact_number?: string;
  call_reference_number?: string;
  type_of_called_back_queue?: string;
}

export interface CallBackQueueUpdateParams {
  reason: string;
}
