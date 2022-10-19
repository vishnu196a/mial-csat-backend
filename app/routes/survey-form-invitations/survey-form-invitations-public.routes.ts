import invitationFormRouterOpts from './survey-form-invitations-router-option';

import { sendInvitation } from '../../controllers/v1/survey-form-invitations.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

function surveyFormInvitationPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get(
    '/v1/surveys/invitation',
    invitationFormRouterOpts,
    sendInvitation
  );

  next();
}
export default surveyFormInvitationPublicRoutes;
