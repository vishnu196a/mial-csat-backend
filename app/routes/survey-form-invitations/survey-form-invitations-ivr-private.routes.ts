import getActiveSurveyFormRouterOpts from './survey-form-invitations-send-email-router-option';
import createSurveyFormInvitationRouterOpts from './survey-form-invitation-create-router-option';

import { FastifyInstance } from 'fastify';
import { Server, ServerResponse, IncomingMessage } from 'http';
import {
  createSurveyFormInvitation
} from '../../controllers/v1/survey-form-invitations.controller';

function surveyFormInvitationsIVRPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'POST',
    url: '/v1/surveys/invitation/create',
    handler: createSurveyFormInvitation
  });
  next();
}

export default surveyFormInvitationsIVRPrivateRoutes;
