import { ivrAuthHook } from '../hooks/ivr-authentication.hook';
import { FastifyInstance } from 'fastify';
import { ssoIVRPrivateRoutes } from './sso';
import { surveyFormInvitationsIVRPrivateRoutes } from './survey-form-invitations';

import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
  interface FastifyRequest {
    ivrUser;
  }
}

function privateIVRRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  ivrAuthHook(fastify);
  fastify.register(ssoIVRPrivateRoutes);
  fastify.register(surveyFormInvitationsIVRPrivateRoutes);
  next();
}

export default privateIVRRoutes;
