export interface AddRequestEmailParams {
  city?: string;
  email?: string;
  title: string;
  address?: string;
  subject: string;
  country?: string;
  telephone?: string;
  mobile_no: string;
  last_name?: string;
  first_name: string;
  created_by: bigint;
  postal_code?: string;
  nationality?: string;
  call_entry_id: number;
  date_of_birth?: Date;
  place_of_make?: string;
  date_of_issue?: Date;
  meet_and_assist: string;
  passport_number?: string;
  port_of_destination?: string;
  mail_to_feedback_team: boolean;
  contact_person_email_id: string[];
}

export interface SendRequestEmailParams {
  city?: string;
  email?: string;
  title: string;
  address?: string;
  subject: string;
  country?: string;
  telephone?: string;
  mobile_no: string;
  last_name?: string;
  first_name: string;
  postal_code?: string;
  nationality?: string;
  call_entry_id: number;
  date_of_birth?: Date;
  place_of_make?: string;
  date_of_issue?: Date;
  meet_and_assist: string;
  passport_number?: string | null;
  port_of_destination?: string;
  mail_to_feedback_team: boolean;
  contact_person_email_id: string[];
}
