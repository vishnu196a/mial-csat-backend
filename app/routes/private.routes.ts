import addUserAuthHook from '../hooks/user-authentication.hook';

import { UserInstance } from '../types';
import { FastifyInstance } from 'fastify';
import { usersPrivateRoutes } from './users';
import { surveyFormsPrivateRoutes } from './survey-forms';
import { surveyFormResponsesPrivateRoutes } from './survey-form-responses';
import { surveyFormInvitationsPrivateRoutes } from './survey-form-invitations';
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
  fastify.register(usersPrivateRoutes);
  fastify.register(surveyFormsPrivateRoutes);
  fastify.register(surveyFormResponsesPrivateRoutes);
  fastify.register(surveyFormInvitationsPrivateRoutes);
  next();
}

export default privateRoutes;
