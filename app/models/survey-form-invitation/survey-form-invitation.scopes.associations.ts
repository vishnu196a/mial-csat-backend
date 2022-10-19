import { User, SurveyForm, SurveyFormResponse, SurveyFormInvitation } from '../../models';

function defineScopeAndAssociation() {
  SurveyFormInvitation.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  });

  SurveyFormInvitation.belongsTo(SurveyForm, {
    as: 'survey_form',
    foreignKey: 'survey_form_id',
  });
  SurveyFormInvitation.belongsTo(User, {
    as: 'users',
    foreignKey: 'resent_by_id',
  });

  SurveyFormInvitation.hasMany(SurveyFormResponse);
}

export default defineScopeAndAssociation;
