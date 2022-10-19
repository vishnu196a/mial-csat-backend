import activityLogger from '../../config/activity-logger';
import { add } from '../../services/feedback-email.service';
import { ValidationError } from 'sequelize';
import { AddFeedbackEmailParams } from '../../types';
import { FastifyReply, FastifyRequest } from 'fastify';

function addFeedbackEmail(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddFeedbackEmailParams;
  const currentUser = req.currentUser;
  add(attrs, currentUser)
    .then((feedbackEmail) => {
      activityLogger.log(currentUser, feedbackEmail, 'feedback email', 'created');
      reply.code(201).send(feedbackEmail);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}
export { addFeedbackEmail };
