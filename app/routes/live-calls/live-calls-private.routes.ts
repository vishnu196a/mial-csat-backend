import liveCallListRouterOpts from './live-calls-list-router-option';

import { FastifyInstance } from 'fastify';
import { liveCall } from '../../controllers/v1/live-calls.controller';

import { IncomingMessage, Server, ServerResponse } from 'http';

function liveCallsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/live_calls',
    schema: liveCallListRouterOpts,
    handler: liveCall,
  });
  next();
}
export default liveCallsPrivateRoutes;
