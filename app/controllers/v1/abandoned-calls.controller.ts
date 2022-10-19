import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddCallTagParams,
  CallbackQueueListQueryParams,
  AbandonedCallsListQueryParams,
  CalledbackQueueListQueryParams
} from '../../types';
import {
  update,
  detailForCallTag,
  filterAndPaginate,
  getAnAbandonedCall,
  filterAndPaginateCallBackQueue,
  filterAndPaginateCalledBackQueue
} from '../../services/abandoned-call.service';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as AbandonedCallsListQueryParams;
  filterAndPaginate(query)
    .then((abandonedCalls) => {
      reply.code(200).send(abandonedCalls);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function updateCallBackQueue(req: FastifyRequest, reply: FastifyReply) {
  const currentUser = req.currentUser;
  const { id } = req.params as { id: number };
  const attrs = req.body as AddCallTagParams;
  getAnAbandonedCall(id)
    .then(() => {
      update(id, currentUser, attrs)
        .then((updatedAbandonedCall) => {
          activityLogger.log(currentUser, updatedAbandonedCall, 'callback queue', 'updated');
          reply.code(200).send(updatedAbandonedCall);
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

function callTagDetail(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detailForCallTag(id)
    .then((detail) => {
      reply.code(200).send(detail);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function listCallBackQueue(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CallbackQueueListQueryParams;
  filterAndPaginateCallBackQueue(query)
    .then((callBackQueue) => {
      reply.code(200).send(callBackQueue);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function listCalledBackQueue(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CalledbackQueueListQueryParams;
  filterAndPaginateCalledBackQueue(query, req.currentUser)
    .then((calledBackQueue) => {
      reply.code(200).send(calledBackQueue);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export {
  list,
  callTagDetail,
  listCallBackQueue,
  updateCallBackQueue,
  listCalledBackQueue
};
