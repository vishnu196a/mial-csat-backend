import { CallTagInstance } from './call-tag';

export interface AddCallTagParams {
  answer: string;
  question: string;
  terminal_id?: number;
  category_id: number;
  mode_of_call: string;
  caller_name?: string;
  call_entry_id: number;
  sub_category_id: number;
  caller_email_id?: string;
}

export interface AddManualCallTagParams {
  answer: string;
  callerid: string;
  question: string;
  terminal_id?: number;
  category_id: number;
  datetime_end: Date;
  mode_of_call: string;
  caller_name?: string;
  datetime_init: Date;
  sub_category_id: number;
  caller_email_id?: string;
  id_queue_call_entry: number;
  datetime_entry_queue: Date;
}

export interface CallTagListQueryParams {
  q?: string;
  to?: string;
  page?: number;
  from?: string;
  answer?: string;
  per_page?: number;
  call_type?: string;
  question?: string;
  caller_name?: string;
  mode_of_call?: string;
  contact_number?: string;
  category_name?:string; 
  created_by_name?: string;
  sub_category_name?: string;
  o_call_type: string;
  o_mode_of_call: string;
  o_date_and_time: string;
  o_call_duration: string;
  o_contact_number: string;
  o_created_by_name: string;
  o_call_answer_time: string;
  o_sub_category_name: string;
  o_call_reference_number: string;
}

export interface CallTagRowsAndCount {
  count: number;
  rows: CallTagInstance[];
}

export interface updateCallTagParams {
  answer: string; 
  question: string; 
  category_id: number; 
  mode_of_call: string;
  call_entry_id: number; 
  sub_category_id: number; 
}