import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { SurveyFormInvitationyStatic } from '../../types';

import { modelOptions, attributes } from './survey-form-invitation.model.attributes';

function SurveyFormInvitationModelFactory(
  sequelize: Sequelize
): SurveyFormInvitationyStatic {
  return sequelize.define(
    'SurveyFormInvitation',
    attributes,
    modelOptions) as SurveyFormInvitationyStatic;
}

const SurveyFormInvitation = SurveyFormInvitationModelFactory(db);

export default SurveyFormInvitation;
