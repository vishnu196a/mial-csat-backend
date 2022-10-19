import getIdsAndNamesQueueCallEntryRouterOpts from './queue-call-entry-get-ids-names.router.option';

import { listAll } from '../../controllers/v1/queue-call-entry.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

function queueCallEntryPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/queue_call_entry/names_and_ids',
    schema: getIdsAndNamesQueueCallEntryRouterOpts,
    handler: listAll
  });

  next();
}
export default queueCallEntryPrivateRoutes;
