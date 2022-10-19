import activityLogger from '../../config/activity-logger';

import { ValidationError } from 'sequelize';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddContentManagementSystemParams,
  ContentManagementSystemUpdateParams,
  ContentManagementSystemListQueryParams
} from '../../types/content-management-system.controller';
import {
  add,
  update,
  detail,
  filterAndPaginate,
  contentManagementSystemDelete,
  getContentManagementSystemById
} from '../../services/content-management-system.service';

function addContentManagementSystem(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddContentManagementSystemParams;
  const currentUser = req.currentUser;
  add(params, currentUser).then((cmsResult) => {
    activityLogger.log(currentUser, cmsResult, 'content management system', 'created');
    reply.code(201).send(cmsResult);
  })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ContentManagementSystemListQueryParams;
  filterAndPaginate(query)
    .then((cmsResult) => {
      reply.code(200).send(cmsResult);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailContentManagementSystem(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((cmsResult) => {
      reply.code(200).send(cmsResult);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateContentManagementSystem(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const attrs = req.body as ContentManagementSystemUpdateParams;
  const { id } = req.params as { id: number };
  const { currentUser } = req;
  getContentManagementSystemById(id)
    .then(() => {
      update(id, attrs)
        .then((updatedCms) => {
          activityLogger.log(currentUser, updatedCms, 'content management system', 'updated');
          reply.code(200).send(updatedCms);
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

function deleteContentManagementSystem(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  getContentManagementSystemById(id)
    .then(async (cmsResult) => {
      await contentManagementSystemDelete(id);
      activityLogger.log(currentUser, { id }, 'content management system', 'deleted');
      reply.send({ message: 'Content Management System deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  list,
  addContentManagementSystem,
  detailContentManagementSystem,
  updateContentManagementSystem,
  deleteContentManagementSystem
};
