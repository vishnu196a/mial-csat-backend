import { listAll } from '../../services/role.service';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

function list(req: FastifyRequest, reply: FastifyReply) {
  listAll()
    .then((roles) => {
      reply.code(200).send(roles);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { list };
