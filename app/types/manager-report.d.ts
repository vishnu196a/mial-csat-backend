import { Model, BuildOptions } from 'sequelize';

export interface ManagerReportAttributes {
  id: bigint;
  name: string;
  payload: object;
  created_at: Date;
  updated_at: Date;
  created_by: bigint;
  updated_by: bigint;
  handler_name: string;
  filter_columns: object;
  deleted_at: Date | null;
}

export type ManagerReportCreationAttributes = Pick<
  ManagerReportAttributes,
  'name' | 'handler_name' | 'filter_columns' | 'created_by' | 'payload'
>;

export interface ManagerReportInstance
  extends Model<ManagerReportAttributes, ManagerReportCreationAttributes>,
    ManagerReportAttributes {}

export type ManagerReportStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ManagerReportInstance;
};
