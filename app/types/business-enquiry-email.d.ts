import { CallEntryInstance } from './call-entry';
import { Model, BuildOptions } from 'sequelize';

export interface BusinessEnquiryEmailAttributes {
  id: bigint;
  name: string | null;
  date: Date | null;
  phone_no: string | null;
  comments: string
  email_id: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  call_entry_id: number;
  customer_email_id: string | null;
}

export type BusinessEnquiryEmailCreateAttributes = Pick<
  BusinessEnquiryEmailAttributes,
  'name' | 'date' | 'phone_no' | 'comments' | 'email_id' | 'created_by' |
  'call_entry_id' | 'customer_email_id'
>;

export interface BusinessEnquiryEmailInstance
  extends Model<BusinessEnquiryEmailAttributes, BusinessEnquiryEmailCreateAttributes>,
  BusinessEnquiryEmailAttributes {
  call_entry: CallEntryInstance;
}

export type BusinessEnquiryEmailStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): BusinessEnquiryEmailInstance;
};
