import callTagDetailRouterOpts from './call-back-queue-tag-detail.router-option';
import listAbandonedCallRouterOpts from './abandoned-calls-list.router-option';
import listCallBackQueueRouterOpts from './call-back-queue-list.router-option';
import listCalledBackQueueRouterOpts from './called-back-queue-list.router-option';
import updateAbandonedCallRouterOpts from './update-abandoned-call.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  list,
  callTagDetail,
  listCallBackQueue,
  updateCallBackQueue,
  listCalledBackQueue
} from '../../controllers/v1/abandoned-calls.controller';

function abandonedCallsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/abandoned_calls',
    schema: listAbandonedCallRouterOpts,
    handler: list
  });
  fastify.route({
    method: 'GET',
    url: '/v1/abandoned_calls/call_back_queue',
    schema: listCallBackQueueRouterOpts,
    handler: listCallBackQueue
  });
  fastify.route({
    method: 'GET',
    url: '/v1/abandoned_calls/called_back_queue',
    schema: listCalledBackQueueRouterOpts,
    handler: listCalledBackQueue
  });
  fastify.route({
    method: 'GET',
    url: '/v1/abandoned_calls/call_back_queue/:id',
    schema: callTagDetailRouterOpts,
    handler: callTagDetail
  });
  fastify.route({
    method: 'PUT',
    url: '/v1/abandoned_calls/call_back_queue/:id',
    schema: updateAbandonedCallRouterOpts,
    handler: updateCallBackQueue
  });

  next();
}
export default abandonedCallsPrivateRoutes;
