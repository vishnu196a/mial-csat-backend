import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { AgentStatic } from '../../types';

import { attributes, modelOptions } from './agent.model.attributes';

function AgentModelFactory(sequelize: Sequelize): AgentStatic {
  return sequelize.define('Agent', attributes, modelOptions) as AgentStatic;
}

const Agent = AgentModelFactory(db);

export default Agent;
