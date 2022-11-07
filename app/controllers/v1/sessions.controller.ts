import { LoginBodyParams } from '../../types';

import { signin, markLogout } from '../../services/session.service';
import { FastifyReply, FastifyRequest } from 'fastify';

function loginSync(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as LoginBodyParams;
  const { id } = req.params as { id: number };
  signin(id, attrs)
    .then(() => {
      reply.code(200).send({ message: 'Sigin synced successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function logoutSync(request: FastifyRequest, reply: FastifyReply) {
  markLogout(request.currentUser)
    .then(() => {
      reply.code(200).send({ message: 'logged out synced successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export { loginSync, logoutSync };
