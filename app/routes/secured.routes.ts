import addSecuredAuthHook from '../hooks/secured-authentication.hook';

import { FastifyInstance } from 'fastify';
import { sessionsSecuredRoutes } from './sessions';
import { Server, ServerResponse, IncomingMessage } from 'http';

function securedRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addSecuredAuthHook(fastify);
  fastify.register(sessionsSecuredRoutes);
  next();
}

export default securedRoutes;
