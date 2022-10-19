import { CallEntryInstance } from './call-entry';
import { Model, BuildOptions } from 'sequelize';

export interface RequestEmailAttributes {
  id: bigint;
  city: string | null;
  email: string | null;
  title: string;
  address: string | null;
  subject: string;
  telephone: string | null;
  mobile_no: string;
  last_name: string | null;
  first_name: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  postal_code: string | null;
  nationality: string | null;
  call_entry_id: number;
  date_of_birth: Date | null;
  place_of_make: string | null;
  date_of_issue: Date | null;
  meet_and_assist: string;
  passport_number: string | null;
  port_of_destination: string | null;
  mail_to_feedback_team: boolean;
  contact_person_email_id: string;
}

export type RequestEmailCreateAttributes = Pick<
  RequestEmailAttributes,
  'city' | 'email' | 'title' | 'address' | 'subject' | 'telephone' | 'mobile_no' | 'last_name' |
  'first_name' | 'created_by' | 'postal_code' | 'nationality' | 'call_entry_id'
  | 'date_of_birth' | 'place_of_make' | 'date_of_issue' | 'meet_and_assist' |
  'passport_number' | 'port_of_destination' | 'mail_to_feedback_team' |
  'contact_person_email_id'
>;

export interface RequestEmailInstance
  extends Model<RequestEmailAttributes, RequestEmailCreateAttributes>,
  RequestEmailAttributes {
  call_entry: CallEntryInstance;
}

export type RequestEmailStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): RequestEmailInstance;
};
