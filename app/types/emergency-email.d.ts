import { CallEntryInstance } from './call-entry';
import { Model, BuildOptions } from 'sequelize';

export interface EmergencyEmailAttributes {
  id: bigint;
  subject: string;
  phone_no: string | null;
  email_id: string;
  comments: string;
  department: string | null;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  call_entry_id: number;
  contact_person: string;  
}

export type EmergencyEmailCreateAttributes = Pick<
  EmergencyEmailAttributes,
  'subject' | 'phone_no' | 'email_id' | 'comments' | 'department' | 'created_by' |
  'call_entry_id' | 'contact_person'
>;

export interface EmergencyEmailInstance
  extends Model<EmergencyEmailAttributes, EmergencyEmailCreateAttributes>,
  EmergencyEmailAttributes {
  call_entry: CallEntryInstance;
}

export type EmergencyEmailStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): EmergencyEmailInstance;
};
