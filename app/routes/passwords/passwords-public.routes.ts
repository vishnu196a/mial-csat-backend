import sendResetPasswordRouterOpts from './passwords-reset.router-option';
import resetPasswordRouterOpts from './passwords-reset-password.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  resetPassword,
  sendResetPasswordLink
} from '../../controllers/v1/passwords.controller';

function passwordsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post(
    '/v1/passwords/send_reset_password_link',
    sendResetPasswordRouterOpts,
    sendResetPasswordLink
  );
  fastify.post('/v1/passwords/reset', resetPasswordRouterOpts, resetPassword);

  next();
}
export default passwordsPublicRoutes;
