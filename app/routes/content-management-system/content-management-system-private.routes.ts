import addContentManagementSystemRouterOpts from './content-management-system-add.router-option';
import listContentManagementSystemRouterOpts from './content-management-system-list.router-option';
import contentManagementSystemDetailRouterOpts from './content-management-system-detail.router-option';
import updateContentManagementSystemRouterOpts from './content-management-system-update.router-option';
import deleteContentManagementSystemRouterOpts from './content-management-system-delete.router-option';

import { FastifyInstance } from 'fastify';
import { canAdd, canUpdate, canDelete } from '../../hooks/content-management-system-policy.hooks';

import {
  list,
  addContentManagementSystem,
  detailContentManagementSystem,
  updateContentManagementSystem,
  deleteContentManagementSystem
} from '../../controllers/v1/content-management-system.controller';
import {
  Server,
  ServerResponse,
  IncomingMessage
} from 'http';

function contentManagementSystemPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/content_management_system',
    schema: addContentManagementSystemRouterOpts,
    preHandler: canAdd,
    handler: addContentManagementSystem
  });

  fastify.route({
    method: 'GET',
    url: '/v1/content_management_system',
    schema: listContentManagementSystemRouterOpts,
    handler: list
  });

  fastify.route({
    method: 'GET',
    url: '/v1/content_management_system/:id',
    schema: contentManagementSystemDetailRouterOpts,
    handler: detailContentManagementSystem
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/content_management_system/:id',
    schema: updateContentManagementSystemRouterOpts,
    preHandler: canUpdate,
    handler: updateContentManagementSystem
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/content_management_system/:id',
    schema: deleteContentManagementSystemRouterOpts,
    preHandler: canDelete,
    handler: deleteContentManagementSystem
  });

  next();
}
export default contentManagementSystemPrivateRoutes;
