import surveyFormEmailRouterOpts from './survey-form-invitations-send-email-router-option';
import surveyFormInvitationMobileRouterOpts from './survey-form-invitations-mobile-router-option';

import { FastifyInstance } from 'fastify';

import { sendToEmail, sendToMobile } from '../../controllers/v1/survey-form-invitations.controller';
import { Server, ServerResponse, IncomingMessage } from 'http';

function surveyFormInvitationsIVRPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/surveys/send_to_email',
    schema: surveyFormEmailRouterOpts,
    handler: sendToEmail
  });

  fastify.route({
    method: 'POST',
    url: '/v1/surveys/send_to_mobile',
    schema: surveyFormInvitationMobileRouterOpts,
    handler: sendToMobile
  });

  next();
}

export default surveyFormInvitationsIVRPrivateRoutes;
