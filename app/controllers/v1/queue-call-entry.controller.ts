import { listAllQueueCallEntry } from '../../services/queue-call-entry.service';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

function listAll(req: FastifyRequest, reply: FastifyReply) {
  listAllQueueCallEntry()
    .then((queueCallEntry) => {
      reply.code(200).send(queueCallEntry);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { listAll };
