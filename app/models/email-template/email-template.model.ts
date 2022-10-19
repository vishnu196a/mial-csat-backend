import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { EmailTemplateStatic } from '../../types';
import { modelOptions, attributes } from './email-template.model.attributes';

function EmailTemplateModelFactory(sequelize: Sequelize): EmailTemplateStatic {
  return sequelize.define('EmailTemplate', attributes, modelOptions) as EmailTemplateStatic;
}

const EmailTemplate = EmailTemplateModelFactory(db);

export default EmailTemplate;
