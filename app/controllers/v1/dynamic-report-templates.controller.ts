import activityLogger from '../../config/activity-logger';

import {
  add,
  filterAndPaginate,
  addDynamicReportToDownloadQueue
} from '../../services/dynamic-report-template.service';

import {
  UserInstance,
  AddDynamicReportTemplateParams,
  DynamicReportTemplateListQueryParams
} from '../../types';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as DynamicReportTemplateListQueryParams;
  filterAndPaginate(query)
    .then((dynamicReports) => {
      reply.code(200).send(dynamicReports);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function addDynamicReportTemplateToDownloadQueue(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { filters } = req.body as { filters: object };
  const currentUser: UserInstance = req.currentUser;
  addDynamicReportToDownloadQueue(id, filters, currentUser)
    .then((downloadQueue) => {
      activityLogger.log(
        currentUser,
        downloadQueue,
        'dynamic report download queue',
        'created'
      );
      reply.code(201).send(downloadQueue);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

async function addDynamicReportTemplate(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddDynamicReportTemplateParams;
  const currentUser: UserInstance = req.currentUser;
  add(params, currentUser)
    .then((managerReport) => {
      activityLogger.log(
        currentUser,
        managerReport,
        'dynamic report template',
        'created'
      );
      reply.code(201).send(managerReport);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { list, addDynamicReportTemplate, addDynamicReportTemplateToDownloadQueue };
