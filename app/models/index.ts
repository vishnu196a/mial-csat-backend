import Role from './role/role.model';
import User from './user/user.model';
import Agent from './agent/agent.model';
import SurveyForm from './survey-form/survey-form.model';
import SurveyFormResponse from './survey-form-response/survey-form-response.model';
import SurveyFormInvitation from './survey-form-invitation/survey-form-invitation.model';
import surveyformAssociation from './survey-form/survey-form.scopes.associations';
import userScopeAndAssociation from './user/user.scopes.associations';
import roleScopesAndAssociations from './role/role.scopes.associations';
import surveyFormResponseScopeAndAssociation from './survey-form-response/survey-form-response.scopes.associations';
import surveyFromInvitationScopeAndAssociation from './survey-form-invitation/survey-form-invitation.scopes.associations';

roleScopesAndAssociations();
userScopeAndAssociation();
surveyFormResponseScopeAndAssociation();
surveyFromInvitationScopeAndAssociation();
surveyformAssociation();

export {
  User,
  Role,
  Agent,
  SurveyForm,
  SurveyFormResponse,
  SurveyFormInvitation,
};
