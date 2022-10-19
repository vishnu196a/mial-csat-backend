import db from '../../config/database';

import { Sequelize }  from 'sequelize';
import { SurveyFormResponseStatic } from '../../types';
import { modelOptions, attributes } from './survey-form-response.model.attributes';

function SurveyFormResponseModelFactory(sequelize: Sequelize): SurveyFormResponseStatic {
  return sequelize.define(
    'SurveyFormResponse',
    attributes,
    modelOptions
  ) as SurveyFormResponseStatic;
}

const SurveyFormResponse = SurveyFormResponseModelFactory(db);

export default SurveyFormResponse;
