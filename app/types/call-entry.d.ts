import { CallTagInstance } from './call-tag';
import { QueueCallEntryInstance } from './queue-call-entry';

import {
  Model,
  BuildOptions,
  HasManyGetAssociationsMixin
} from 'sequelize';

export interface CallEntryAttributes {
  id: bigint;
  trunk: string;
  status: string;
  reason: string;
  c_status: string;
  c_action: string;
  c_reason: string;
  id_agent: number;
  callerid: string;
  duration: number;
  transfer: string;
  uniqueid: string;
  call_type: string;
  id_contact: number;
  id_campaign: number;
  datetime_end: Date;
  datetime_init: Date;
  duration_wait: number;
  call_back_queue: boolean;
  id_queue_call_entry: number;
  datetime_entry_queue: Date;
  abandoned_call_updated_by: bigint | null;
}

export type CallEntryCreateAttributes = Pick<
CallEntryAttributes,
  'id_agent' | 'id_queue_call_entry' | 'callerid' | 'trunk' |
  'datetime_init' | 'datetime_end' | 'duration' | 'duration_wait' |
  'status' | 'datetime_entry_queue' | 'uniqueid' | 'call_type'
>;

export interface CallEntryInstance
  extends Model<CallEntryAttributes, CallEntryCreateAttributes>,
  CallEntryAttributes {
  call_tags: CallTagInstance;
  queue_call_entry: QueueCallEntryInstance;

  getCallEntries: HasManyGetAssociationsMixin<CallTagInstance>;
}

export type CallEntryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CallEntryInstance;
};
