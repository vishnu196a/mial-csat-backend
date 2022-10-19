import axios from 'axios';
import logger from '../config/logger';

import { EmptyResultError } from 'sequelize';

import { map, size } from 'lodash';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { DownloadQueue, ManagerReport } from '../models';
import { DOWNLOAD_REPORT_TYPE, Q_MINIMUM_SIZE } from '../config/constants';

import {
  globalSearchQuery,
  columnSearchQuery
} from '../queries/manager-report';

import {
  UserInstance,
  ManagerReportInstance,
  ManagerReportRowsAndCount,
  ManagerReportListQueryParams
} from '../types';
import moment from 'moment';

function getManagerReportById(id: number) {
  return ManagerReport.findByPk(id)
    .then((managerReport) => {
      if (!managerReport) {
        throw new EmptyResultError('Manager report not found');
      }
      return managerReport;
    })
    .catch((error) => {
      throw error;
    });
}

function filterAndPaginate(query: ManagerReportListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return ManagerReport.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['id', 'ASC']]
  }).then((managerReports: ManagerReportRowsAndCount) => {
    const managerReportList = map(
      managerReports.rows,
      (row: ManagerReportInstance) => {
        const data = {
          id: row.id,
          name: row.name,
          payload: row.payload,
          created_at: row.created_at,
          updated_at: row.updated_at,
          filters: row.filter_columns['filters'] // tslint:disable-line
        };
        return data;
      }
    );
    const rowsAndCounts = {
      count: managerReports.count,
      rows: managerReportList
    };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'manager_reports');
  });
}

function addStaticReportToDownloadQueue(
  id: number,
  filters,
  currentUser: UserInstance
) {
  const { DOWNLOAD_MANAGER_URL = '', DOWNLOAD_MANAGER_TOKEN = '' } =
    process.env;
  return getManagerReportById(id)
    .then((managerReport) => {
      const reportPayload = {
        filters,
        handler_name: managerReport.handler_name
      };
      const downloadQueueAttrs = {
        type: DOWNLOAD_REPORT_TYPE.static,
        name: managerReport.name,
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
            logger.debug(`${DOWNLOAD_MANAGER_URL} - succuss`);
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
export { filterAndPaginate, addStaticReportToDownloadQueue };
