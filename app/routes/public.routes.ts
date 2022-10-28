import { FastifyInstance } from 'fastify';
import { surveyFormResponsesPublicRoutes } from './survey-form-responses';
import { Server, ServerResponse, IncomingMessage } from 'http';

function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(surveyFormResponsesPublicRoutes);
  next();
}

export default publicRoutes;
