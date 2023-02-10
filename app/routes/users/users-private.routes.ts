import addUserRouterOpts from './users-add.router-option';
import deleteUserRouterOpts from './users-delete.router-option';
import updateUserRouterOpts from './users-update.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canAdd,
  canUpdate,
  canDelete,
} from '../../hooks/user-policy.hooks';

import {
  addUser,
  updateUser,
  deleteUser
} from '../../controllers/v1/users.controller';

function usersPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'POST',
    url: '/v1/users/sync',
    schema: addUserRouterOpts,
    preHandler: canAdd,
    handler: addUser
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/users/sync/:id',
    schema: updateUserRouterOpts,
    preHandler: canUpdate,
    handler: updateUser
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/users/sync/:id',
    schema: deleteUserRouterOpts,
    preHandler: canDelete,
    handler: deleteUser
  });

  next();
}
export default usersPrivateRoutes;
