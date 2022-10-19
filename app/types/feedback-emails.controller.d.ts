export interface AddFeedbackEmailParams {
  subject: string;
  feedback: string;
  email_id: string[];
  responded?: string;
  flight_info: string;
  caller_name: string;
  call_entry_id: number;
  date_of_journey: string;
  mail_to_feedback_team?: boolean;
}

export interface SendFeedbackEmailParams {
  subject: string;
  feedback: string;
  email_id: string[];
  responded?: string;
  flight_info: string;
  caller_name: string;
  date_of_journey: string;
  feedback_team_email?: string;
  mail_to_feedback_team?: boolean;
}
