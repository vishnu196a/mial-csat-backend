import activityLogger from '../../config/activity-logger';
import { add } from '../../services/business-enquiry-email.service';
import { ValidationError } from 'sequelize';
import { AddBusinessEnquiryEmailParams } from '../../types';
import { FastifyReply, FastifyRequest } from 'fastify';

function addBusinessEnquiryEmail(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddBusinessEnquiryEmailParams;
  const currentUser = req.currentUser;
  add(attrs, currentUser)
    .then((businessEnquiryEmail) => {
      activityLogger.log(currentUser, businessEnquiryEmail, 'business enquiry email', 'created');
      reply.code(201).send(businessEnquiryEmail);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}
export { addBusinessEnquiryEmail };
