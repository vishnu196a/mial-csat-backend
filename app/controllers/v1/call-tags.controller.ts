import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  add,
  update,
  detail,
  callTagDelete,
  manualCallTag,
  getCallTagData,
  filterAndPaginate
} from '../../services/call-tag.service';
import {
  AddCallTagParams,
  updateCallTagParams,
  AddManualCallTagParams,
  CallTagListQueryParams
} from '../../types';

function addCallTag(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddCallTagParams;
  const currentUser = req.currentUser;
  add(attrs, currentUser)
    .then((callTag) => {
      activityLogger.log(currentUser, callTag, 'call tag', 'created');
      reply.code(201).send(callTag);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function addManualCallTag(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as AddManualCallTagParams;
  const currentUser = req.currentUser;
  manualCallTag(attrs, currentUser)
    .then((result) => {
      activityLogger.log(currentUser, result, 'manual call tag', 'created');
      reply.code(201).send(result);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function listCallTag(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CallTagListQueryParams;
  filterAndPaginate(query, req.currentUser)
    .then((callTags) => {
      reply.code(200).send(callTags);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function updateCallTag(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as updateCallTagParams;
  const { id } = req.params as { id: number };
  update(id, attrs)
    .then((callTag) => {
      activityLogger.log(req.currentUser, callTag, 'call tag', 'updated');
      reply.code(200).send(callTag);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function detailCallTag(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((callTag) => {
      reply.code(200).send(callTag);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function deleteCallTag(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  callTagDelete(id)
    .then(() => {
      activityLogger.log(req.currentUser, { id }, 'call tag', 'deleted');
      reply.code(200).send({ message: 'Call tag deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function callTagData(req: FastifyRequest, reply: FastifyReply) {
  const { call_entry_id: callEntryId } = req.params as { call_entry_id: number };
  getCallTagData(callEntryId)
    .then((result) => {
      reply.code(200).send(result);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export {
  addCallTag,
  listCallTag,
  callTagData,
  updateCallTag,
  detailCallTag,
  deleteCallTag,
  addManualCallTag
};
