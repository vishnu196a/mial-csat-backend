import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { TerminalInformationStatic } from '../../types';
import { modelOptions, attributes } from './terminal-information.model.attributes';

function TerminalInformationModelFactory(sequelize: Sequelize): TerminalInformationStatic {
  return sequelize.define(
    'TerminalInformation',
    attributes,
    modelOptions
  ) as TerminalInformationStatic;
}

const TerminalInformation = TerminalInformationModelFactory(db);

export default TerminalInformation;
