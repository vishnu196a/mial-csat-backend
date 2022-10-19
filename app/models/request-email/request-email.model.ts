import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { RequestEmailStatic } from '../../types';
import { modelOptions, attributes } from './request-email.model.attributes';

function RequestEmailModelFactory(sequelize: Sequelize): RequestEmailStatic {
  return sequelize.define('RequestEmail', attributes, modelOptions) as RequestEmailStatic;
}

const RequestEmail = RequestEmailModelFactory(db);

export default RequestEmail;
