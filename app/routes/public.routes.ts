import { FastifyInstance } from 'fastify';
import { ssoIVRSecureRoutes } from './sso';
import { sessionsPublicRoutes } from './sessions';
import { passwordsPublicRoutes } from './passwords';
import { surveyFormResponsesPublicRoutes } from './survey-form-responses';
import { surveyFormInvitationPublicRoutes } from './survey-form-invitations';
import { Server, ServerResponse, IncomingMessage } from 'http';

function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(ssoIVRSecureRoutes);
  fastify.register(sessionsPublicRoutes);
  fastify.register(passwordsPublicRoutes);
  fastify.register(surveyFormResponsesPublicRoutes);
  fastify.register(surveyFormInvitationPublicRoutes);
  next();
}

export default publicRoutes;
