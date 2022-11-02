import loginRouterOpts from './sessions-login.router-option';

import { loginSync } from '../../controllers/v1/sessions.controller';
import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.put('/v1/login/sync/:id', loginRouterOpts, loginSync);
  next();
}
export default sessionsPublicRoutes;
