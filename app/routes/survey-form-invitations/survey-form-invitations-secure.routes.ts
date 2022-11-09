import createSurveyFormInvitationRouterOpts from './survey-form-invitation-create-router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  createSurveyFormInvitation
} from '../../controllers/v1/survey-form-invitations.controller';

function surveyFormInvitationSecuredRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post(
    '/v1/invitation/create/sync',
    createSurveyFormInvitationRouterOpts,
    createSurveyFormInvitation
  );
  next();
}
export default surveyFormInvitationSecuredRoutes;
