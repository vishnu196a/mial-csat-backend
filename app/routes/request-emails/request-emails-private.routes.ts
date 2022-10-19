import createRequestEmailRouterOpts from './request-emails-create.router-option';

import { FastifyInstance } from 'fastify';
import { addRequestEmail } from '../../controllers/v1/request-emails.controller';
import { IncomingMessage, Server, ServerResponse } from 'http';

function requestEmailsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/request_emails',
    schema: createRequestEmailRouterOpts,
    handler: addRequestEmail,
  });
  next();
}

export default requestEmailsPrivateRoutes;
