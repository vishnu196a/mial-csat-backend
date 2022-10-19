import {
  Model,
  BuildOptions
} from 'sequelize';

export interface AgentAttributes {
  id: number;
  type: string;
  name: string;
  number: string;
  estatus: string;
  password: string;
  eccp_password: string;
}

export type AgentCreateAttributes = Pick<
AgentAttributes,
  'type' | 'name' | 'number' | 'password'
>;

export interface AgentInstance
  extends Model<AgentAttributes, AgentCreateAttributes>,
  AgentAttributes {}

export type AgentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AgentInstance;
};
