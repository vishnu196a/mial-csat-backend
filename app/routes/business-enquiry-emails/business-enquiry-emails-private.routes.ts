import createBusinessEnquiryEmailRouterOpts from './business-enquiry-emails-create.router-option';

import { FastifyInstance } from 'fastify';
import { addBusinessEnquiryEmail } from '../../controllers/v1/business-enquiry-emails.controller';
import { IncomingMessage, Server, ServerResponse } from 'http';

function businessEnquiryEmailsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/business_enquiry_emails',
    schema: createBusinessEnquiryEmailRouterOpts,
    handler: addBusinessEnquiryEmail,
  });
  next();
}

export default businessEnquiryEmailsPrivateRoutes;
