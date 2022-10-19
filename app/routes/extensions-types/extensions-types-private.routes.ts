import addExtensionTypeRouterOpts from './extensions-types-add.router-option';
import listExtensionTypeRouterOpts from './extensions-types-list.router-option';
import extensionTypeDetailRouterOpts from './extensions-types-detail.router-option';
import updateExtensionTypeRouterOpts from './extensions-types-update.router-option';
import deleteExtensionTypeRouterOpts from './extensions-types-delete.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  list,
  addExtensionType,
  detailExtensionType,
  updateExtensionType,
  deleteExtensionType
 } from '../../controllers/v1/extensions-types.controller';

function extensionsTypesPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/extension_types',
    schema: listExtensionTypeRouterOpts,
    handler: list
  });

  fastify.route({
    method: 'POST',
    url: '/v1/extension_types',
    schema: addExtensionTypeRouterOpts,
    handler: addExtensionType
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/extension_types/:id',
    schema: updateExtensionTypeRouterOpts,
    handler: updateExtensionType
  });

  fastify.route({
    method: 'GET',
    url: '/v1/extension_types/:id',
    schema: extensionTypeDetailRouterOpts,
    handler: detailExtensionType
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/extension_types/:id',
    schema: deleteExtensionTypeRouterOpts,
    handler: deleteExtensionType
  });

  next();
}
export default extensionsTypesPrivateRoutes;
