import activityLogger from '../../config/activity-logger';
import { FastifyReply, FastifyError, FastifyRequest } from 'fastify';

import {
  AddTerminalParams,
  TerminalUpdateParams,
  TerminalListQueryParams
} from '../../types/terminals.controller';
import {
  add,
  detail,
  update,
  getById,
  terminalDelete,
  listAllTerminals,
  filterAndPaginate
} from '../../services/terminal.service';

function addTerminal(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddTerminalParams;
  const currentUser = req.currentUser;
  add(params, currentUser)
    .then((terminal) => {
      activityLogger.log(currentUser, terminal, 'terminal', 'created');
      reply.code(201).send(terminal);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as TerminalListQueryParams;
  filterAndPaginate(query)
    .then((terminals) => {
      reply.code(200).send(terminals);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailTerminal(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((terminal) => {
      reply.code(200).send(terminal);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateTerminal(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as TerminalUpdateParams;
  const currentUser = req.currentUser;
  const { id } = req.params as { id: number };
  getById(id)
    .then(() => {
      update(id, attrs)
        .then((updatedTerminal) => {
          activityLogger.log(currentUser, updatedTerminal, 'terminal', 'updated');
          reply.code(200).send(updatedTerminal);
        })
        .catch((error) => {
          reply.send(error);
        });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function listAll(req: FastifyRequest, reply: FastifyReply) {
  listAllTerminals()
    .then((terminals) => {
      reply.code(200).send(terminals);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function deleteTerminal(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  terminalDelete(id)
    .then(() => {
      activityLogger.log(req.currentUser, { id }, 'terminal', 'deleted');
      reply.send({ message: 'Terminal deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  list,
  listAll,
  addTerminal,
  updateTerminal,
  detailTerminal,
  deleteTerminal
};
