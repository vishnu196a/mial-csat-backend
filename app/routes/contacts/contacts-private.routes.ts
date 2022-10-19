import listContactRouterOpts from './contacts-list.router-option';
import createContactRouterOpts from './contacts-create.router-option';
import contactDetailRouterOpts from './contacts.detail.router-option';
import updateContactRouterOpts from './contacts-update.router.option';
import deleteContactRouterOpts from './contacts-delete.router-option';

import { FastifyInstance } from 'fastify';

import {
  canAdd,
  canUpdate,
  canDelete
} from '../../hooks/contact-policy.hooks';
import {
  Server,
  ServerResponse,
  IncomingMessage
} from 'http';
import {
  list,
  addContact,
  updateContact,
  detailContact,
  deleteContact,
} from '../../controllers/v1/contacts.controllers';

function contactPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/contacts',
    schema: createContactRouterOpts,
    preHandler: canAdd,
    handler: addContact
  });
  fastify.route({
    method: 'GET',
    url: '/v1/contacts/:id',
    schema: contactDetailRouterOpts,
    preHandler: canUpdate,
    handler: detailContact
  });
  fastify.route({
    method: 'PUT',
    url: '/v1/contacts/:id',
    schema: updateContactRouterOpts,
    preHandler: canUpdate,
    handler: updateContact
  });
  fastify.route({
    method: 'GET',
    url: '/v1/contacts',
    schema: listContactRouterOpts,
    handler: list,
  });
  fastify.route({
    method: 'DELETE',
    url: '/v1/contacts/:id',
    schema: deleteContactRouterOpts,
    preHandler: canDelete,
    handler: deleteContact
  });
  next();
}

export default contactPrivateRoutes;
