import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { TerminalStatic } from '../../types';
import { modelOptions, attributes } from './terminal.model.attributes';

function TerminalModelFactory(sequelize: Sequelize): TerminalStatic {
  return sequelize.define(
    'Terminal',
    attributes,
    modelOptions
  ) as TerminalStatic;
}

const Terminal = TerminalModelFactory(db);

export default Terminal;
