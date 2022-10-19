import { UserInstance } from '../../types';
import { filterAndPaginate } from '../../services/untaged-call-entry.service';

import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query;
  const currentUser: UserInstance = req.currentUser;
  filterAndPaginate(query, currentUser)
    .then((callEntries) => {
      reply.code(200).send(callEntries);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { list };
