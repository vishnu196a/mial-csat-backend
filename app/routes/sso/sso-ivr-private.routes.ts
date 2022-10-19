import ssoLogoutRouterOpts from './sso-logout.router-option';
import ssoAuthenticateRouterOpts from './sso-authenticate.router-option';

import { FastifyInstance } from 'fastify';
import { getSSOUrl, ssoLogout } from '../../controllers/v1/sso.controller';

import { Server, IncomingMessage, ServerResponse } from 'http';

function ssoIVRPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/v1/sso/authenticate', ssoAuthenticateRouterOpts, getSSOUrl);
  fastify.delete('/v1/sso/logout', ssoLogoutRouterOpts, ssoLogout);
  next();
}

export default ssoIVRPrivateRoutes;
