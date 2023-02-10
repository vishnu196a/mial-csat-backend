import { FastifyInstance } from 'fastify';
import { surveyFormResponsesPublicRoutes } from './survey-form-responses';
import { surveyFormInvitationPublicRoutes } from './survey-form-invitations';
import { Server, ServerResponse, IncomingMessage } from 'http';

function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(surveyFormResponsesPublicRoutes);
  fastify.register(surveyFormInvitationPublicRoutes);
  next();
}

export default publicRoutes;
