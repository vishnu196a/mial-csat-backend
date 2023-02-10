import logoutRouterOpts from './sessions-logout.router-option';

import { logoutSync } from '../../controllers/v1/sessions.controller';
import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.delete('/v1/logout/sync', logoutRouterOpts, logoutSync);
  next();
}
export default sessionsPrivateRoutes;
