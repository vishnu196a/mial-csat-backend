import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { FeedbackEmailStatic } from '../../types';
import { modelOptions, attributes } from './feedback-email.model.attributes';

function FeedbackEmailModelFactory(sequelize: Sequelize): FeedbackEmailStatic {
  return sequelize.define('FeedbackEmail', attributes, modelOptions) as FeedbackEmailStatic;
}

const FeedbackEmail = FeedbackEmailModelFactory(db);

export default FeedbackEmail;
