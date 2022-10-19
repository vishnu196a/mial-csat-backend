import createEmergencyEmailRouterOpts from './emergency-emails-create.router-option';

import { FastifyInstance } from 'fastify';
import { addEmergencyEmail } from '../../controllers/v1/emergency-emails.controller';
import { IncomingMessage, Server, ServerResponse } from 'http';

function emergencyEmailsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/emergency_emails',
    schema: createEmergencyEmailRouterOpts,
    handler: addEmergencyEmail,
  });
  next();
}

export default emergencyEmailsPrivateRoutes;
