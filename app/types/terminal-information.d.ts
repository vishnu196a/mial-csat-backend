import { TerminalInstance } from './terminal';
import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface TerminalInformationAttributes {
  id: bigint;
  phone?: string;
  email?: string;
  category: string;
  location: string;
  shop_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;  
  description?: string;
  terminal_id: bigint;
  created_by: bigint;
  updated_by: bigint
}

export type TerminalInformationCreateAttributes = Pick<
TerminalInformationAttributes,
  'phone' | 'email' | 'category' | 'location' | 'shop_name'
  | 'description' | 'terminal_id' | 'created_by'
>;

export interface TerminalInformationInstance
  extends Model<TerminalInformationAttributes, TerminalInformationCreateAttributes>,
  TerminalInformationAttributes {
  terminal: TerminalInstance;

  isAdmin(): Boolean,
  isAgent(): Boolean

  getTerminal: BelongsToGetAssociationMixin<TerminalInstance>;
}

export type TerminalInformationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TerminalInformationInstance;
};
