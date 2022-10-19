import axios from 'axios';
import logger from '../config/logger';

import { HttpError } from '../exceptions';
import { map, size } from 'lodash';
import { User, DownloadQueue } from '../models';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/download-queue';

import {
  DownloadQueueInstance,
  AddDownloadQueueParams,
  DownloadQueueRowsAndCount,
  DownloadQueueListQueryParams,
  UserInstance,
} from '../types';

async function filterAndPaginate(query: DownloadQueueListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return DownloadQueue.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['created_at', 'DESC']],
    include: {
      as: 'user',
      model: User,
      attributes: ['id', 'name'],
      paranoid: false
    }
  }).then((downloadQueues: DownloadQueueRowsAndCount) => {
    const downloadQueueList = map(downloadQueues.rows, (row: DownloadQueueInstance) => {
      const data = {
        id: row.id,
        name: row.name,
        status: row.status,
        user_id: row.user.id,
        user_name: row.user.name,
        created_at: row.created_at,
        updated_at: row.updated_at,
        report_download_link: row.report_download_path
      };
      return data;
    });
    const rowsAndCounts = { count: downloadQueues.count, rows: downloadQueueList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'download_queues');
  });
}

function add(attrs: AddDownloadQueueParams, user: UserInstance) {
  const {
    DOWNLOAD_MANAGER_URL= '',
    DOWNLOAD_MANAGER_TOKEN= ''
  } = process.env;
  return DownloadQueue.create({
    name: attrs.name,
    payload: attrs.payload,
    user_id: user.id
  }).then((downloadQueue) => {
    axios({
      method: 'post',
      url: DOWNLOAD_MANAGER_URL,
      headers: {
        Authorization: DOWNLOAD_MANAGER_TOKEN,
      },
      data: {}
    })
      .then(() => logger.debug(`${DOWNLOAD_MANAGER_URL} - success`))
      .catch((err) => {
        const httpError =  new HttpError(err);
        logger.error({ err: httpError }, httpError.message);
      });
    return downloadQueue;
  });
}

export { add, filterAndPaginate };
