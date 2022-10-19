import {
  User,
  SurveyForm,
  SurveyFormInvitation,
  SurveyFormResponse
} from '../../models';

function defineScopeAndAssociation() {
  SurveyForm.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by',
  });
  SurveyForm.belongsTo(User, {
    as: 'updated_user',
    foreignKey: 'updated_by',
  });
  SurveyForm.hasMany(SurveyFormInvitation, {
    as: 'survey_form_invitations',
    foreignKey: 'survey_form_id'
  });
  SurveyForm.hasMany(SurveyFormResponse, {
    as: 'survey_form_responses',
    foreignKey: 'survey_form_id'
  });
}
export default defineScopeAndAssociation;
