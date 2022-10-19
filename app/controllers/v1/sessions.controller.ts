import { LoginBodyParams } from '../../types';

import { signin, markLogout } from '../../services/session.service';
import { FastifyReply, FastifyRequest } from 'fastify';

function login(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = req.body as LoginBodyParams;
  signin({ email, password, ipaddress: req.ip })
    .then((user) => {
      reply.header('Authorization', `Bearer ${user.access_token}`);
      reply.code(200).send(user);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function logout(request: FastifyRequest, reply: FastifyReply) {
  markLogout(request.currentUser)
    .then(() => {
      reply.header('Authorization', null);
      reply.code(200).send({ message: 'Successfully logged out' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export { login, logout };
