import addDownloadQueueRouterOpts from './download-queues-add.router-option';
import listDownloadQueueRouterOpts from './download-queues-list.router-option';

import { FastifyInstance } from 'fastify';
import {
  list,
  addDownloadQueue
} from '../../controllers/v1/download-queues.controller';
import {
  Server,
  ServerResponse,
  IncomingMessage
} from 'http';

function downloadQueuePrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/download_queues',
    schema: listDownloadQueueRouterOpts,
    handler: list
  });

  fastify.route({
    method: 'POST',
    url: '/v1/download_queues',
    schema: addDownloadQueueRouterOpts,
    handler: addDownloadQueue
  });

  next();
}
export default downloadQueuePrivateRoutes;
