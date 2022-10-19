import { User, SurveyForm, SurveyFormInvitation, SurveyFormResponse } from '../../models';

function defineScopeAndAssociation() {
  SurveyFormResponse.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  });
  SurveyFormResponse.belongsTo(SurveyForm, {
    as: 'survey_form',
    foreignKey: 'survey_form_id'
  });
  SurveyFormResponse.belongsTo(SurveyFormInvitation, {
    as: 'survey_form_invitation',
    foreignKey: 'survey_form_invitation_id'
  });
}

export default defineScopeAndAssociation;
