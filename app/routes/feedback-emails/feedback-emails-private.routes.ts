import createFeedbackEmailRouterOpts from './feedback-emails-create.router-option';

import { FastifyInstance } from 'fastify';
import { addFeedbackEmail } from '../../controllers/v1/feedback-emails.controller';
import { IncomingMessage, Server, ServerResponse } from 'http';

function feedbackEmailsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/feedback_emails',
    schema: createFeedbackEmailRouterOpts,
    handler: addFeedbackEmail,
  });
  next();
}

export default feedbackEmailsPrivateRoutes;
