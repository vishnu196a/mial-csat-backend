import listManagerReportsRouterOpts from './manager-reports-list.router-option';
import addManagerReportToDownloadQueueRouterOpts from './manager-reports-add-to-download-queue-router-option';

import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  list,
  addManagerReportToDownloadQueue
} from '../../controllers/v1/manager-reports.controller';

function managerReportsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/manager_reports',
    schema: listManagerReportsRouterOpts,
    handler: list
  });
  fastify.route({
    method: 'POST',
    url: '/v1/manager_reports/:id',
    schema: addManagerReportToDownloadQueueRouterOpts,
    handler: addManagerReportToDownloadQueue
  });
  next();
}
export default managerReportsPrivateRoutes;
