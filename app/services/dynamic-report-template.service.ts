import axios from 'axios';
import logger from '../config/logger';

import { EmptyResultError } from 'sequelize';

import { map, size } from 'lodash';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { DownloadQueue, DynamicReportTemplate } from '../models';
import { DOWNLOAD_REPORT_TYPE, Q_MINIMUM_SIZE } from '../config/constants';

import {
  globalSearchQuery,
  columnSearchQuery
} from '../queries/dynamic-report-templates';

import {
  UserInstance,
  DynamicReportTemplateInstance,
  DynamicReportTemplateRowsAndCount,
  DynamicReportTemplateListQueryParams,
  AddDynamicReportTemplateParams
} from '../types';

function getDynamicReportTemplateById(id: number) {
  return DynamicReportTemplate.findByPk(id)
    .then((dynamicReportTemplate) => {
      if (!dynamicReportTemplate) {
        throw new EmptyResultError('Dynamic report template not found');
      }
      return dynamicReportTemplate;
    })
    .catch((error) => {
      throw error;
    });
}

function filterAndPaginate(query: DynamicReportTemplateListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return DynamicReportTemplate.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['id', 'ASC']]
  }).then((dynamicReportTemplates: DynamicReportTemplateRowsAndCount) => {
    const dynamicReportTemplateList = map(
      dynamicReportTemplates.rows,
      (row: DynamicReportTemplateInstance) => {
        const data = {
          id: row.id,
          name: row.name,
          payload: row.payload,
          created_at: row.created_at,
          updated_at: row.updated_at
        };
        return data;
      }
    );
    const rowsAndCounts = {
      count: dynamicReportTemplates.count,
      rows: dynamicReportTemplateList
    };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'dynamic_report_templates');
  });
}

function addDynamicReportToDownloadQueue(
  id: number,
  filters,
  currentUser: UserInstance
) {
  const { DOWNLOAD_MANAGER_URL = '', DOWNLOAD_MANAGER_TOKEN = '' } =
    process.env;
  return getDynamicReportTemplateById(id)
    .then((dynamicReportTemplate) => {
      const reportPayload = {
       columns: dynamicReportTemplate.payload["columns"], // tslint:disable-line
        filters // tslint:disable-line
      };
      const downloadQueueAttrs = {
        type: DOWNLOAD_REPORT_TYPE.dynamic,
        name: dynamicReportTemplate.name,
        user_id: currentUser.id,
        payload: reportPayload
      };
      return DownloadQueue.create(downloadQueueAttrs).then((downloadQueue) => {
        axios({
          method: 'POST',
          url: DOWNLOAD_MANAGER_URL,
          headers: {
            Authorization: DOWNLOAD_MANAGER_TOKEN
          },
          data: {}
        })
          .then(() => {
            logger.debug(`${DOWNLOAD_MANAGER_URL} -  success`);
          })
          .catch((error) => {
            logger.error({ err: error });
          });
        return downloadQueue;
      });
    })
    .catch((error) => {
      throw error;
    });
}

async function add(attrs: AddDynamicReportTemplateParams, currentUser: UserInstance) {
  const dynamicReportTemplateCreateAttrs = {
    name: attrs.name,
    payload: attrs.payload,
    created_by: currentUser.id,
  };
  return await DynamicReportTemplate.create(dynamicReportTemplateCreateAttrs);
}

export { add, filterAndPaginate, addDynamicReportToDownloadQueue };
