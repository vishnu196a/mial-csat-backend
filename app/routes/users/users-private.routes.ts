import addUserRouterOpts from './users-add.router-option';
import listUserRouterOpts from './users-list.router-option';
import userDetailRouterOpts from './users-detail.router-option';
import deleteUserRouterOpts from './users-delete.router-option';
import updateUserRouterOpts from './users-update.router-option';
import getIdsAndNamesUserRouterOpts from './users-get-ids-names.router.option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canAdd,
  canView,
  canUpdate,
  canDelete,
  canViewDetail
} from '../../hooks/user-policy.hooks';
import {
  list,
  listAll,
  addUser,
  detailUser,
  updateUser,
  deleteUser
 } from '../../controllers/v1/users.controller';

function usersPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/users',
    schema: listUserRouterOpts,
    preHandler: canView,
    handler: list
  });

  fastify.route({
    method: 'GET',
    url: '/v1/users/names_and_ids',
    schema: getIdsAndNamesUserRouterOpts,
    handler: listAll
  });

  fastify.route({
    method: 'POST',
    url: '/v1/users',
    schema: addUserRouterOpts,
    preHandler: canAdd,
    handler: addUser
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/users/:id',
    schema: updateUserRouterOpts,
    preHandler: canUpdate,
    handler: updateUser
  });

  fastify.route({
    method: 'GET',
    url: '/v1/users/:id',
    schema: userDetailRouterOpts,
    preHandler: canViewDetail,
    handler: detailUser
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/users/:id',
    schema: deleteUserRouterOpts,
    preHandler: canDelete,
    handler: deleteUser
  });

  next();
}
export default usersPrivateRoutes;
