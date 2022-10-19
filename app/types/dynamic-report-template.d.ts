import { Model, BuildOptions } from 'sequelize';

export interface DynamicReportTemplateAttributes {
  id: bigint;
  name: string;
  payload: object;
  created_at: Date;
  updated_at: Date;
  created_by: bigint;
  updated_by: bigint;
  deleted_at: Date | null;
}

export type DynamicReportTemplateCreationAttributes = Pick<
  DynamicReportTemplateAttributes,
  'name' | 'created_by' | 'payload'
>;

export interface DynamicReportTemplateInstance
  extends Model<DynamicReportTemplateAttributes, DynamicReportTemplateCreationAttributes>,
    DynamicReportTemplateAttributes {}

export type DynamicReportTemplateStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DynamicReportTemplateInstance;
};
