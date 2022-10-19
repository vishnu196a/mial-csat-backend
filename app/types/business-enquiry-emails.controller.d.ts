export interface AddBusinessEnquiryEmailParams {
  name?: string | null;
  date?: Date | null;
  phone_no?: string | null;
  comments: string
  email_id: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  call_entry_id: number;
  customer_email_id?: string | null;
}

export interface SendBusinessEnquiryEmailParams {
  name?: string | null;
  date?: Date | null;
  phone_no?: string | null;
  comments: string
  email_id: string[];
  customer_email_id?: string | null;
}
