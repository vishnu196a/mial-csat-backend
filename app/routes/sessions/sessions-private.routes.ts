import logoutRouterOpts from './sessions-logout.router-option';

import { logout } from '../../controllers/v1/sessions.controller';
import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.delete('/v1/logout', logoutRouterOpts, logout);
  next();
}
export default sessionsPrivateRoutes;
