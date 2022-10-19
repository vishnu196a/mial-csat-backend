import listRoleRouterOpts from './roles-list.router-option';

import { FastifyInstance } from 'fastify';
import { list } from '../../controllers/v1/roles.controller';

import { IncomingMessage, Server, ServerResponse } from 'http';

function rolesPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/v1/roles', listRoleRouterOpts, list);
  next();
}
export default rolesPrivateRoutes;
