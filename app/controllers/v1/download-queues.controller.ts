import activityLogger from '../../config/activity-logger';

import { ValidationError } from 'sequelize';
import { add, filterAndPaginate } from '../../services/download-queue.service';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddDownloadQueueParams,
  DownloadQueueListQueryParams
} from '../../types/download-queues.controller';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as DownloadQueueListQueryParams;
  filterAndPaginate(query)
    .then((downloadQueues) => {
      reply.code(200).send(downloadQueues);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function addDownloadQueue(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddDownloadQueueParams;
  const currentUser = req.currentUser;
  add(params, currentUser)
    .then((downloadQueue) => {
      activityLogger.log(currentUser, downloadQueue, 'downloadQueue', 'created');
      reply.code(201).send(downloadQueue);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export { list, addDownloadQueue };
