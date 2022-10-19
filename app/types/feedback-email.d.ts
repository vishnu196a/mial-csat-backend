import { CallEntryInstance } from './call-entry';
import { Model, BuildOptions } from 'sequelize';

export interface FeedbackEmailAttributes {
  id: number;
  subject: string;
  feedback: string;
  email_id: string;
  responded?: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  flight_info: string;
  caller_name: string;
  call_entry_id: number;
  date_of_journey: string;
  mail_to_feedback_team?: boolean;
}

export type FeedbackEmailCreateAttributes = Pick<
  FeedbackEmailAttributes,
  'call_entry_id' | 'responded' | 'mail_to_feedback_team' | 'subject' | 'feedback' |
  'flight_info' | 'date_of_journey' | 'email_id' | 'caller_name' | 'created_by'
>;

export interface FeedbackEmailInstance
  extends Model<FeedbackEmailAttributes, FeedbackEmailCreateAttributes>,
  FeedbackEmailAttributes {
  call_entry: CallEntryInstance;
}

export type FeedbackEmailStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): FeedbackEmailInstance;
};
