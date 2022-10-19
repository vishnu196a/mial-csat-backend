import activityLogger from '../../config/activity-logger';
import { add } from '../../services/emergency-email.service';
import { ValidationError } from 'sequelize';
import { AddEmergencyEmailParams } from '../../types';
import { FastifyReply, FastifyRequest } from 'fastify';

function addEmergencyEmail(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddEmergencyEmailParams;
  const currentUser = req.currentUser;
  add(attrs, currentUser)
    .then((requestEmail) => {
      activityLogger.log(currentUser, requestEmail, 'request email', 'created');
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
export { addEmergencyEmail };
