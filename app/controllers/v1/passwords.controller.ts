import { ValidationError } from 'sequelize';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  ResetPasswordParams,
  ChangePasswordParams
} from '../../types';

import {
  verifyAndResetPassword,
  verifyAndChangePassword,
  sendResetPasswordInstruction
} from '../../services/password.service';

function sendResetPasswordLink(req: FastifyRequest, reply: FastifyReply) {
  const { email } = req.body as { email: string };
  sendResetPasswordInstruction(email)
    .then(() => {
      reply.code(200).send({
        message: 'You will receive reset password instructions if your email is registered with us'
      });
    })
    .catch(() => {
      reply.code(200).send({
        message: 'You will receive reset password instructions if your email is registered with us'
      });
    });
}

function resetPassword(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as ResetPasswordParams;
  const token = req.headers.authorization || '';
  verifyAndResetPassword(token, params)
    .then(() => {
      reply.code(200).send({ message: 'Password has been reset successfully' });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function changePassword(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as ChangePasswordParams;
  verifyAndChangePassword(req.currentUser, params)
    .then((user) => {
      reply.code(200).send(user);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export {
  resetPassword,
  changePassword,
  sendResetPasswordLink,
};
