import { Model, BuildOptions } from 'sequelize';

export interface LiveCallAttributes {
  id: bigint;
  hold: string;
  id_agent: bigint;
  uniqueid: string;
  callerid: number;
  datetime_init: Date;
  id_call_entry: bigint;
  ChannelClient: string;
  id_queue_call_entry: bigint;
}

export type LiveCallCreateAttributes = Pick<
  LiveCallAttributes,
  'callerid' | 'datetime_init' | 'uniqueid'
>

export interface LiveCallInstance
  extends Model<LiveCallAttributes, LiveCallCreateAttributes>,
  LiveCallAttributes {

}

export type LiveCallStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): LiveCallInstance;
};
