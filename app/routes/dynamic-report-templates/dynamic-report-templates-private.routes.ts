import addDynamicReportTemplateRouterOpts from './dynamic-report-templates-add.router-option';
import listDynamicReportTemplatesRouterOpts from './dynamic-report-templates-list.router-option';
import addDynamicReportTemplateToDownloadQueueRouterOpts from './dynamic-report-templates-add-to-download-queue-router-option';

import { FastifyInstance } from 'fastify';

import { Server, IncomingMessage, ServerResponse } from 'http';
import {
  list,
  addDynamicReportTemplate,
  addDynamicReportTemplateToDownloadQueue
} from '../../controllers/v1/dynamic-report-templates.controller';

function dynamicReportTemplatesPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/dynamic_report_templates',
    schema: listDynamicReportTemplatesRouterOpts,
    handler: list
  });
  fastify.route({
    method: 'POST',
    url: '/v1/dynamic_report_templates/:id',
    schema: addDynamicReportTemplateToDownloadQueueRouterOpts,
    handler: addDynamicReportTemplateToDownloadQueue
  });
  fastify.route({
    method: 'POST',
    url: '/v1/dynamic_report_templates',
    schema: addDynamicReportTemplateRouterOpts,
    handler: addDynamicReportTemplate
  });
  next();
}

export default dynamicReportTemplatesPrivateRoutes;
