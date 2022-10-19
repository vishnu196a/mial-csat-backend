import ssoLoginRouterOpts from './sso-login.router-option';

import { ssoLogin } from '../../controllers/v1/sso.controller';
import { FastifyInstance } from 'fastify';
import { ivrLoginAuthHook } from '../../hooks/ivr-authentication.hook';

import { Server, IncomingMessage, ServerResponse } from 'http';

function ssoIVRSecureRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  ivrLoginAuthHook(fastify);
  fastify.post('/v1/sso/login', ssoLoginRouterOpts, ssoLogin);
  next();
}

export default ssoIVRSecureRoutes;
