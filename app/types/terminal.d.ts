import { ContactInstance } from './contact';
import {
  Model,
  BuildOptions,
  HasManyGetAssociationsMixin
} from 'sequelize';

export interface TerminalAttributes {
  id: bigint;
  name: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type TerminalCreateAttributes = Pick<
  TerminalAttributes, 'name' | 'created_by'
>;

export interface TerminalInstance
  extends Model<TerminalAttributes, TerminalCreateAttributes>,
  TerminalAttributes {
    contact: ContactInstance;

    getContacts: HasManyGetAssociationsMixin<ContactInstance>;
  }

export type TerminalStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TerminalInstance;
};
