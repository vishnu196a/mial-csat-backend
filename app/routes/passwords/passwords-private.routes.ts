import changePasswordRouterOpts from './passwords-change-password.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  changePassword,
} from '../../controllers/v1/passwords.controller';

function passwordsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/v1/passwords/change_password', changePasswordRouterOpts, changePassword);

  next();
}
export default passwordsPrivateRoutes;
