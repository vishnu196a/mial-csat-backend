import fastifySwagger from '@fastify/swagger';
import { list } from '../../controllers/v1/untaged-call-entries.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import listUntagedCallRouterOpts from './call-entries-list.router.option';

function callEntriesPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/untaged_call_tags',
    schema: listUntagedCallRouterOpts,
    handler: list
  });
  next();
}

export default callEntriesPrivateRoutes;
