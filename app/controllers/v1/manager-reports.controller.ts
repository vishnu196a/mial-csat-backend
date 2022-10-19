import activityLogger from '../../config/activity-logger';

import {
  filterAndPaginate,
  addStaticReportToDownloadQueue
} from '../../services/manager-report.service';

import {
  UserInstance,
  ManagerReportListQueryParams
} from '../../types';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ManagerReportListQueryParams;
  filterAndPaginate(query)
    .then((managerReports) => {
      reply.code(200).send(managerReports);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function addManagerReportToDownloadQueue(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { filters } = req.body as { filters: object };
  const currentUser: UserInstance = req.currentUser;
  addStaticReportToDownloadQueue(id, filters, currentUser)
    .then((downloadQueue) => {
      activityLogger.log(
        currentUser,
        downloadQueue,
        'static report download queue',
        'created'
      );
      reply.code(201).send(downloadQueue);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { list, addManagerReportToDownloadQueue };
