import listCallTagRouterOpts from './call-tags-list.router.option';
import callTagDataRouterOpts from './call-tags-data.router-option';
import createCallTagRouterOpts from './call-tags-create.router-option';
import detailCallTagRouterOpts from './call-tags-detail.router-option';
import deleteCallTagRouterOpts from './call-tags-delete.router.option';
import updateCallTagRouterOpts from './call-tags-update.router.option';
import createManualCallTagRouterOpts from './manual-call-tags-data.router-option';

import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canUpdate,
  canDelete
} from '../../hooks/call-tag-policy.hooks';
import {
  addCallTag,
  listCallTag,
  callTagData,
  detailCallTag,
  updateCallTag,
  deleteCallTag,
  addManualCallTag
} from '../../controllers/v1/call-tags.controller';

function callTagsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/call_tags',
    schema: createCallTagRouterOpts,
    handler: addCallTag,
  });
  fastify.route({
    method: 'POST',
    url: '/v1/call_tags/manual',
    schema: createManualCallTagRouterOpts,
    handler: addManualCallTag,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/call_tags',
    schema: listCallTagRouterOpts,
    handler: listCallTag,
  });
  fastify.route({
    method: 'PUT',
    url: '/v1/call_tags/:id',
    schema: updateCallTagRouterOpts,
    preHandler: canUpdate,
    handler: updateCallTag,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/call_tags/:id',
    schema: detailCallTagRouterOpts,
    handler: detailCallTag
  });
  fastify.route({
    method: 'GET',
    url: '/v1/call_tags/info/:call_entry_id',
    schema: callTagDataRouterOpts,
    handler: callTagData
  });
  fastify.route({
    method: 'DELETE',
    url: '/v1/call_tags/:id',
    schema: deleteCallTagRouterOpts,
    preHandler: canDelete,
    handler: deleteCallTag
  });
  next();
}

export default callTagsPrivateRoutes;
