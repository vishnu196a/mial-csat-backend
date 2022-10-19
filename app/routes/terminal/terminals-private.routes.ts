import listTerminalRouterOpts from './terminals-list.router-option';
import createTerminalRouterOpts from './terminals-create.router-option';
import terminalDetailRouterOpts from './terminals.detail.router-option';
import updateTerminalRouterOpts from './terminals-update.router.option';
import deleteTerminalRouterOpts from './terminals-delete.router-option';
import getIdsAndNamesTerminalRouterOpts from './terminals-get-ids-names.router.option';

import { FastifyInstance } from 'fastify';

import {
  list,
  listAll,
  addTerminal,
  updateTerminal,
  detailTerminal,
  deleteTerminal
} from '../../controllers/v1/terminals.controller';
import {
  canAdd,
  canView,
  canUpdate,
  canDelete,
  canViewDetail
} from '../../hooks/terminal-policy.hooks';

import { IncomingMessage, Server, ServerResponse } from 'http';

function terminalsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/terminals',
    schema: createTerminalRouterOpts,
    preHandler: canAdd,
    handler: addTerminal,
  });

  fastify.route({
    method: 'GET',
    url: '/v1/terminals',
    schema: listTerminalRouterOpts,
    preHandler: canView,
    handler: list
  });

  fastify.route({
    method: 'GET',
    url: '/v1/terminals/:id',
    schema: terminalDetailRouterOpts,
    preHandler: canViewDetail,
    handler: detailTerminal
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/terminals/:id',
    schema: updateTerminalRouterOpts,
    preHandler: canUpdate,
    handler: updateTerminal
  });

  fastify.route({
    method: 'GET',
    url: '/v1/terminals/names_and_ids',
    schema: getIdsAndNamesTerminalRouterOpts,
    handler: listAll
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/terminals/:id',
    schema: deleteTerminalRouterOpts,
    preHandler: canDelete,
    handler: deleteTerminal
  });

  next();
}

export default terminalsPrivateRoutes;
