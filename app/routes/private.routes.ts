import addUserAuthHook from '../hooks/user-authentication.hook';

import { UserInstance } from '../types';
import { FastifyInstance } from 'fastify';
import { surveyFormsPrivateRoutes } from './survey-forms';
import { surveyFormResponsesPrivateRoutes } from './survey-form-responses';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addUserAuthHook(fastify);
  fastify.register(surveyFormsPrivateRoutes);
  fastify.register(surveyFormResponsesPrivateRoutes);
  next();
}

export default privateRoutes;
