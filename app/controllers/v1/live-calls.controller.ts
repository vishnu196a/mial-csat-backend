import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { list } from '../../services/live-calls.service';

function liveCall(req: FastifyRequest, reply: FastifyReply) {
  const currentUser = req.currentUser;
  list(currentUser)
    .then((liveCallResult) => {
      reply.code(200).send(liveCallResult);
    })
    .catch((err: FastifyError) => {
      reply.send(err);
    });
}

export { liveCall };
