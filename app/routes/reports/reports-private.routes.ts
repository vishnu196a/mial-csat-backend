import listReportColumnsRouterOpts from './report-columns-list.router-option';
import listCategoryReportRouterOpts from './reports-category-list.router-option';
import listSubCategoryReportRouterOpts from './reports-sub-category-list.router-option';
import viewCategoryChartReportRouterOpts from './reports-category-chart.router-option';
import viewSubCategoryChartReportRouterOpts from './reports-sub-category-chart.router-option';
import listTopThreeSubCategoryReportRouterOpts from './reports-sub-category-top-three-list.router-option';

import { FastifyInstance } from 'fastify';

import {
  Server,
  ServerResponse,
  IncomingMessage
} from 'http';
import {
  columnsList,
  categoryList,
  subCategoryList,
  viewCategoryChart,
  viewSubCategoryChart,
  categoryReportDownload,
  subCategoryReportDownload,
  viewTopThreeSubCategoryList
} from '../../controllers/v1/reports.controller';
import {
  canViewCategoryList,
  canViewCategoryChart,
  canViewSubCategoryList,
  canViewSubCategoryChart,
  canDownloadCategorReport,
  canDownloadSubCategoryReport,
  canViewTopThreeSubCategoryList
} from '../../hooks/report-policy.hooks';

function reportsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/reports/columns',
    schema: listReportColumnsRouterOpts,
    handler: columnsList
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/categories',
    schema: listCategoryReportRouterOpts,
    preHandler: canViewCategoryList,
    handler: categoryList
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/categories/download',
    preHandler: canDownloadCategorReport,
    handler: categoryReportDownload
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/categories/chart',
    schema: viewCategoryChartReportRouterOpts,
    preHandler: canViewCategoryChart,
    handler: viewCategoryChart
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/sub_categories/:category_id',
    schema: listSubCategoryReportRouterOpts,
    preHandler: canViewSubCategoryList,
    handler: subCategoryList
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/sub_categories/download/:category_id',
    preHandler: canDownloadSubCategoryReport,
    handler: subCategoryReportDownload
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/sub_categories/chart/:category_id',
    schema: viewSubCategoryChartReportRouterOpts,
    preHandler: canViewSubCategoryChart,
    handler: viewSubCategoryChart
  });

  fastify.route({
    method: 'GET',
    url: '/v1/reports/sub_categories/top_three/:category_id',
    schema: listTopThreeSubCategoryReportRouterOpts,
    preHandler: canViewTopThreeSubCategoryList,
    handler: viewTopThreeSubCategoryList
  });

  next();
}
export default reportsPrivateRoutes;
