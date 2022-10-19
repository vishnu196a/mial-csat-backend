import activityLogger from '../../config/activity-logger';
import { add } from '../../services/request-email.service';
import { ValidationError } from 'sequelize';
import { AddRequestEmailParams } from '../../types';
import { FastifyReply, FastifyRequest } from 'fastify';

function addRequestEmail(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddRequestEmailParams;
  const currentUser = req.currentUser;
  add(attrs, currentUser)
    .then((requestEmail) => {
      reply.code(201).send(requestEmail);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}
export { addRequestEmail };
