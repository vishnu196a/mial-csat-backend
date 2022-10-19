import loginRouterOpts from './sessions-login.router-option';

import { login } from '../../controllers/v1/sessions.controller';
import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/v1/login', loginRouterOpts, login);
  next();
}
export default sessionsPublicRoutes;
