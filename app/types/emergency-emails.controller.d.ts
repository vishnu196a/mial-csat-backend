export interface AddEmergencyEmailParams {
  subject: string;
  phone_no?: string;
  email_id: string[];
  comments: string;
  department?: string;
  created_by: bigint;
  call_entry_id: number;
  contact_person: string;  
}

export interface SendEmergencyEmailParams {
  subject: string;
  phone_no?: string;
  email_id: string[];
  comments: string;
  department?: string;
  contact_person: string; 
}
