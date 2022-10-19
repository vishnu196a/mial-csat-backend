import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddExtensionTypeParams,
  ExtensionTypeUpdateParams,
  ExtensionTypeListQueryParams
} from '../../types/extensions-types.controller';

import {
  add,
  detail,
  update,
  filterAndPaginate,
  extensionTypeDelete,
  getExtensionTypeById
} from '../../services/extensions-types.service';

function addExtensionType(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddExtensionTypeParams;
  const currentUser = req.currentUser;
  add(params).then((extensionType) => {
    activityLogger.log(currentUser, extensionType, 'extension type', 'created');
    reply.code(201).send(extensionType);
  })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ExtensionTypeListQueryParams;
  filterAndPaginate(query)
    .then((extensionTypes) => {
      reply.code(200).send(extensionTypes);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailExtensionType(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((extensionType) => {
      reply.code(200).send(extensionType);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateExtensionType(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as ExtensionTypeUpdateParams;
  const { currentUser } = req;
  getExtensionTypeById(id)
    .then(() => {
      update(id, attrs)
        .then((extensionType) => {
          activityLogger.log(currentUser, extensionType, 'extension type', 'updated');
          reply.code(200).send(extensionType);
        })
        .catch((error: FastifyError) => {
          if (error instanceof ValidationError) {
            reply.send(error);
          } else {
            reply.code(422).send({ errors: [error.message] });
          }
        });
    }).catch((error: FastifyError) => {
      reply.send(error);
    });
}

function deleteExtensionType(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  getExtensionTypeById(id)
    .then(async (result) => {
      await extensionTypeDelete(id);
      activityLogger.log(currentUser, result, 'extension type', 'deleted');
      reply.send({ message: 'Helpline deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  list,
  addExtensionType,
  detailExtensionType,
  updateExtensionType,
  deleteExtensionType
};
