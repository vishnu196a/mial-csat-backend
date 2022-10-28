import { FastifyInstance } from 'fastify';

import { Server, ServerResponse, IncomingMessage } from 'http';

function surveyFormInvitationsIVRPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) { 

  next();
}

export default surveyFormInvitationsIVRPrivateRoutes;
