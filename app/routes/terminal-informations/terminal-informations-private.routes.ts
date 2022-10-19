import addTerminalInformationsRouterOpts from './terminal-informations-create-router-option';
import listTerminalInformationsRouterOpts from './terminal-informations-list.router-option';
import deleteTerminalInformationsRouterOpts from './terminal-informations-delete.router-option';
import detailTerminalInformationsRouterOpts from './terminal-informations.detail.router-option';
import updateTerminalInformationsRouterOpts from './terminal-informations-update.router-option';

import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canAdd,
  canUpdate,
  canDelete,
} from '../../hooks/terminal-information-policy.hooks';
import {
  list,
  addTerminalInformation,
  detailTerminalInformation,
  updateTerminalInformation,
  deleteTerminalInformation
} from '../../controllers/v1/terminal-informations.controller';

function terminalInformationsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/terminal_informations',
    schema: listTerminalInformationsRouterOpts,
    handler: list
  });
  fastify.route({
    method: 'POST',
    url: '/v1/terminal_informations',
    schema: addTerminalInformationsRouterOpts,
    preHandler: canAdd,
    handler: addTerminalInformation
  });
  fastify.route({
    method: 'GET',
    url: '/v1/terminal_informations/:id',
    schema: detailTerminalInformationsRouterOpts,
    handler: detailTerminalInformation
  });
  fastify.route({
    method: 'PUT',
    url: '/v1/terminal_informations/:id',
    schema: updateTerminalInformationsRouterOpts,
    preHandler: canUpdate,
    handler: updateTerminalInformation
  });
  fastify.route({
    method: 'DELETE',
    url: '/v1/terminal_informations/:id',
    schema: deleteTerminalInformationsRouterOpts,
    preHandler: canDelete,
    handler: deleteTerminalInformation
  });

  next();
}

export default terminalInformationsPrivateRoutes;
