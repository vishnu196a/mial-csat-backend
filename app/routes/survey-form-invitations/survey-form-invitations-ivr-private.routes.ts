
import surveyFormEmailRouterOpts from './survey-form-invitations-send-email-router-option';
import surveyFormCreateRouterOpts from './survey-form-invitation-create-router-option';

import { FastifyInstance } from 'fastify';
import { createInvitationUrl, createSurveyFormInvitation } from '../../controllers/v1/survey-form-invitations.controller';
import { Server, ServerResponse, IncomingMessage } from 'http';

function surveyFormInvitationsIVRPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/invitation',
    schema: surveyFormEmailRouterOpts,
    handler: createInvitationUrl
  });

  fastify.route({
    method: 'POST',
    url: '/v1/surveys/invitation',
    schema: surveyFormCreateRouterOpts,
    handler: createSurveyFormInvitation
  });
  next();
}

export default surveyFormInvitationsIVRPrivateRoutes;
