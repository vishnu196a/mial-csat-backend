import { Model, BuildOptions } from 'sequelize';

export interface QueueCallEntryAttributes {
  id: bigint;
  script: Text;
  queue: string;
  date_end: Date;
  estatus: string;
  date_init: Date;
  time_end: string;
  time_init: string;
  description: string;
}

export type QueueCallEntryCreateAttributes = Pick<
  QueueCallEntryAttributes,
  'description' | 'date_init' | 'time_init' | 'script'
>

export interface QueueCallEntryInstance
  extends Model<QueueCallEntryAttributes, QueueCallEntryCreateAttributes>,
  QueueCallEntryAttributes {

}

export type QueueCallEntryStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): QueueCallEntryInstance;
};
