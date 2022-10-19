import {
  Model,
  BuildOptions
} from 'sequelize';

export interface ExtensionTypeAttributes {
  id: number;
  type: string;
  extension: string;
}

export type ExtensionTypeCreateAttributes = Pick<
  ExtensionTypeAttributes,
  'type' | 'extension'
>;

export interface ExtensionTypeInstance
  extends Model<ExtensionTypeAttributes, ExtensionTypeCreateAttributes>,
  ExtensionTypeAttributes {}

export type ExtensionTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ExtensionTypeInstance;
};
