import addUserAuthHook from '../hooks/user-authentication.hook';

import { UserInstance } from '../types';
import { FastifyInstance } from 'fastify';
import { rolesPrivateRoutes } from './roles';
import { usersPrivateRoutes } from './users';
import { reportsPrivateRoutes } from './reports';
import { contactPrivateRoutes } from './contacts';
import { sessionsPrivateRoutes } from './sessions';
import { callTagsPrivateRoutes } from './call-tags';
import { categoryPrivateRoutes } from './categories';
import { terminalsPrivateRoutes } from './terminal';
import { passwordsPrivateRoutes } from './passwords';
import { liveCallsPrivateRoutes } from './live-calls';
import { callEntriesPrivateRoutes } from './call-entries';
import { surveyFormsPrivateRoutes } from './survey-forms';
import { subCategoryPrivateRoutes } from './sub-categories';
import { flightStatusPrivateRoutes } from './flight-status';
import { requestEmailsPrivateRoutes } from './request-emails';
import { downloadQueuesPrivateRoutes } from './download-queues';
import { feedbackEmailsPrivateRoutes } from './feedback-emails';
import { abandonedCallsPrivateRoutes } from './abandoned-calls';
import { managerReportsPrivateRoutes } from './manager-reports';
import { queueCallEntryPrivateRoutes } from './queue-call-entry';
import { emergencyEmailsPrivateRoutes } from './emergency-emails';
import { extensionsTypesPrivateRoutes } from './extensions-types';
import { surveyFormResponsesPrivateRoutes } from './survey-form-responses';
import { terminalInformationsPrivateRoutes } from './terminal-informations';
import { surveyFormInvitationsPrivateRoutes } from './survey-form-invitations';
import { businessEnquiryEmailsPrivateRoutes } from './business-enquiry-emails';
import { dynamicReportTemplatesPrivateRoutes } from './dynamic-report-templates';
import { contentManagementSystemPrivateRoutes } from './content-management-system';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addUserAuthHook(fastify);
  fastify.register(rolesPrivateRoutes);
  fastify.register(usersPrivateRoutes);
  fastify.register(reportsPrivateRoutes);
  fastify.register(contactPrivateRoutes);
  fastify.register(callTagsPrivateRoutes);
  fastify.register(sessionsPrivateRoutes);
  fastify.register(categoryPrivateRoutes);
  fastify.register(terminalsPrivateRoutes);
  fastify.register(passwordsPrivateRoutes);
  fastify.register(liveCallsPrivateRoutes);
  fastify.register(surveyFormsPrivateRoutes);
  fastify.register(callEntriesPrivateRoutes);
  fastify.register(subCategoryPrivateRoutes);
  fastify.register(flightStatusPrivateRoutes);
  fastify.register(requestEmailsPrivateRoutes);
  fastify.register(downloadQueuesPrivateRoutes);
  fastify.register(feedbackEmailsPrivateRoutes);
  fastify.register(abandonedCallsPrivateRoutes);
  fastify.register(queueCallEntryPrivateRoutes);
  fastify.register(emergencyEmailsPrivateRoutes);
  fastify.register(extensionsTypesPrivateRoutes);
  fastify.register(managerReportsPrivateRoutes);
  fastify.register(surveyFormResponsesPrivateRoutes);
  fastify.register(terminalInformationsPrivateRoutes);
  fastify.register(surveyFormInvitationsPrivateRoutes);
  fastify.register(businessEnquiryEmailsPrivateRoutes);
  fastify.register(dynamicReportTemplatesPrivateRoutes);
  fastify.register(contentManagementSystemPrivateRoutes);
  next();
}

export default privateRoutes;
