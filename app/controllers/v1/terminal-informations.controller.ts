import activityLogger from '../../config/activity-logger';
import { UserListQueryParams } from '../../types/users.controller';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import {
  UserInstance,
  TerminalInformationInstance,
  AddTerminalInformationParams,
  TerminalInformationUpdateParams
} from '../../types';

import {
  add,
  detail,
  update,
  filterAndPaginate,
  terminalInformationDelete,
} from '../../services/terminal-information.service';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as UserListQueryParams;
  filterAndPaginate(query)
    .then((terminalInformations) => {
      reply.code(200).send(terminalInformations);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function addTerminalInformation(req: FastifyRequest, reply: FastifyReply) {
  const currentUser: UserInstance = req.currentUser;
  const params = req.body as AddTerminalInformationParams;
  add(params, currentUser)
    .then((terminalInformation) => {
      activityLogger.log(currentUser, terminalInformation, 'terminal information', 'created');
      reply.code(201).send(terminalInformation);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailTerminalInformation(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((terminalInformation) => {
      reply.code(200).send(terminalInformation);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateTerminalInformation(req: FastifyRequest, reply: FastifyReply) {
  const currentUser = req.currentUser;
  const { id } = req.params as { id: number };
  const attrs = req.body as TerminalInformationUpdateParams;

  update(id, attrs, currentUser)
    .then((terminalInformation) => {
      activityLogger.log(currentUser, terminalInformation, 'terminal information', 'updated');
      reply.code(200).send(terminalInformation);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function deleteTerminalInformation(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  terminalInformationDelete(id)
    .then(() => {
      activityLogger.log(req.currentUser, { id }, 'terminal information', 'deleted');
      reply.send({ message: 'Terminal information deleted successfully' });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export {
  list,
  addTerminalInformation,
  detailTerminalInformation,
  updateTerminalInformation,
  deleteTerminalInformation
};
