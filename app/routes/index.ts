import renderError from './render-error';
import publicRoutes from './public.routes';
import securedRoutes from './secured.routes';
import privateRoutes from './private.routes';
import privateIVRRoutes from './private-ivr.routes';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

function routes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.setErrorHandler((error, req, reply) => {
    renderError(reply, error);
  });
  fastify.register(publicRoutes);
  fastify.register(securedRoutes);
  fastify.register(privateRoutes);
  fastify.register(privateIVRRoutes);
  next();
}

export default routes;
