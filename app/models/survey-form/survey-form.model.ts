import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { SurveyFormStatic } from '../../types';
import { modelOptions, attributes } from './survey-form.model.attributes';

function SurveyFormModelFactory(sequelize: Sequelize): SurveyFormStatic {
  return sequelize.define('SurveyForm', attributes, modelOptions) as SurveyFormStatic;
}

const SurveyForm = SurveyFormModelFactory(db);

export default SurveyForm;
