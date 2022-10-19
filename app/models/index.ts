import Role from './role/role.model';
import User from './user/user.model';
import Agent from './agent/agent.model';
import Contact from './contact/contact.model';
import CallTag from './call-tag/call-tag.model';
import Terminal from './terminal/terminal.model';
import Category from './category/category.model';
import CallEntry from './call-entry/call-entry.model';
import SurveyForm from './survey-form/survey-form.model';
import SubCategory from './sub-category/sub-category.model';
import RequestEmail from './request-email/request-email.model';
import ExtensionType from './extension-type/extension-type.model';
import DownloadQueue from './download-queue/download-queue.model';
import FeedbackEmail from './feedback-email/feedback-email.model';
import EmergencyEmail from './emergency-email/emergency-email.model';
import LiveCallEntry from './live-call/live-call-model';
import EmailTemplate from './email-template/email-template.model';
import ManagerReport from './manager-report/manager-report.model';
import QueueCallEntry from './queue-call-entry/queue-call-entry.model';
import FlightScheduleInfo from './flight-status/flight-status.model';
import SurveyFormResponse from './survey-form-response/survey-form-response.model';
import TerminalInformation from './terminal-information/terminal-information.model';
import BusinessEnquiryEmail from './business-enquiry-email/business-enquiry-email.model';
import FlightCheckInCounter from './flight-check-in-counter/flight-check-in-counter.model';
import SurveyFormInvitation from './survey-form-invitation/survey-form-invitation.model';
import surveyformAssociation from './survey-form/survey-form.scopes.associations';
import DynamicReportTemplate from './dynamic-report-template/dynamic-report-template.model';
import FlightBaggageClaimUnit from './flight-baggage-claim-unit/flight-baggage-claim-unit.model';
import ContentManagementSystem from './content-management-system/content-management-system.model';
import userScopeAndAssociation from './user/user.scopes.associations';
import roleScopesAndAssociations from './role/role.scopes.associations';
import callTagScopeAndAssociation from './call-tag/call-tag.scopes.associations';
import contactScopeAndAssociations from './contact/contact.scopes.asscoiations';
import categoryScopeAndAssociation from './category/category.scopes.associations';
import liveCallScopeAndAssociation from './live-call/live-call.scopes.associations';
import callEntryScopeAndAssociation from './call-entry/call-entry.scopes.associations';
import subcategoryScopeAndAssociation from './sub-category/sub-category.scopes.associations';
import requestEmailScopeAndAssociation from './request-email/request-email.scopes.associations';
import flightStatusScopeAndAssociation from './flight-status/flight-status.scopes.associations';
import downloadQueueScopeAndAssociation from './download-queue/download-queue.scopes.associations';
import feedbackEmailScopeAndAssociation from './feedback-email/feedback-email.scopes.associations';
import emailTemplateScopeAndAssociation from './email-template/email-template.scopes.associations';
import emergencyEmailScopeAndAssociation from './emergency-email/emergency-email.scopes.associations';
import surveyFormResponseScopeAndAssociation from './survey-form-response/survey-form-response.scopes.associations';
import terminalInformationScopeAndAssociation from './terminal-information/terminal-information.scopes.associations';
import businessEnquiryEmailScopeAndAssociation from './business-enquiry-email/business-enquiry-email.scopes.associations';
import flightCheckInCounterScopeAndAssociation from './flight-check-in-counter/flight-check-in-counter.scopes.associations';
import surveyFromInvitationScopeAndAssociation from './survey-form-invitation/survey-form-invitation.scopes.associations';
import dynamicReportTemplateScopeAndAssociation from './dynamic-report-template/dynamic-report-template.scopes.associations';
import flightBaggageClaimUnitScopeAndAssociation from './flight-baggage-claim-unit/flight-baggage-claim-unit.scopes.associations';
import contentManagementSystemScopeAndAssociation from './content-management-system/content-management-system.scopes.associations';

roleScopesAndAssociations();
userScopeAndAssociation();
categoryScopeAndAssociation();
subcategoryScopeAndAssociation();
surveyFormResponseScopeAndAssociation();
surveyFromInvitationScopeAndAssociation();
callEntryScopeAndAssociation();
callTagScopeAndAssociation();
contentManagementSystemScopeAndAssociation();
surveyformAssociation();
contactScopeAndAssociations();
liveCallScopeAndAssociation();
emailTemplateScopeAndAssociation();
terminalInformationScopeAndAssociation();
flightStatusScopeAndAssociation();
flightBaggageClaimUnitScopeAndAssociation();
flightCheckInCounterScopeAndAssociation();
downloadQueueScopeAndAssociation();
feedbackEmailScopeAndAssociation();
requestEmailScopeAndAssociation();
emergencyEmailScopeAndAssociation();
businessEnquiryEmailScopeAndAssociation();
dynamicReportTemplateScopeAndAssociation();

export {
  User,
  Role,
  Agent,
  CallTag,
  Contact,
  Terminal,
  Category,
  CallEntry,
  SurveyForm,
  SubCategory,
  RequestEmail,
  ExtensionType,
  DownloadQueue,
  FeedbackEmail,
  LiveCallEntry,
  ManagerReport,
  EmailTemplate,
  QueueCallEntry,
  EmergencyEmail,
  SurveyFormResponse,
  FlightScheduleInfo,
  TerminalInformation,
  BusinessEnquiryEmail,
  FlightCheckInCounter,
  SurveyFormInvitation,
  DynamicReportTemplate,
  FlightBaggageClaimUnit,
  ContentManagementSystem
};
