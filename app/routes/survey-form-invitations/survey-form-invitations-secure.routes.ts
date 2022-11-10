import createSurveyFormInvitationRouterOpts from './survey-form-invitation-create-router-option';
import getActiveSurveyFormRouterOpts from './survey-form-invitations-mobile-router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  activeSurveyForm,
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

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/activeform',
    schema: getActiveSurveyFormRouterOpts,
    handler: activeSurveyForm
  });

  next();
}
export default surveyFormInvitationSecuredRoutes;
