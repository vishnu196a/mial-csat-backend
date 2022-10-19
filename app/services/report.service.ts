import moment from 'moment';
import DownloadService from './download.service';

import { size } from 'lodash';
import { validateDate } from '../lib/date-validator';
import { Sequelize, Op } from 'sequelize';
import { Category, SubCategory } from '../models';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { orderColumnQuery, columnSearchQuery, globalSearchQuery } from '../queries/report';

import {
  Q_MINIMUM_SIZE,
  SUB_CATEGORY_LIMIT_TOP_THREE,
  SUB_CATEGORY_OFFSET_TOP_THREE
} from '../config/constants';
import {
  ChartQueryParams,
  subCategoryQueryParams,
  CategoryReportListQueryParams,
  SubCategoryReportListQueryParams,
  CategoryReportDownloadQueryParams,
  SubCategoryTopThreeListQueryParams,
  SubCategoryReportDownloadQueryParams
} from '../types';

function checkAndGetDate(
  query: CategoryReportListQueryParams | CategoryReportDownloadQueryParams |
    SubCategoryReportListQueryParams | SubCategoryTopThreeListQueryParams |
    subCategoryQueryParams | ChartQueryParams
) {
  const { to, from } = query;
  if (to && from) {
    validateDate(to, from);
    return {
      endDate: moment(to).format(),
      startDate: moment(from).format()
    };
  }
  return {
    endDate: moment().endOf('day').format(),
    startDate: moment().startOf('month').format()
  };
}

function filterAndPaginateCategory(query: CategoryReportListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const orders = orderColumnQuery(query);
  const columnQuery = columnSearchQuery(query);

  const dateRange = checkAndGetDate(query);
  const countQuery = query.count ? {
    having: { ['count']: { [Op.like]: `%${query.count}%` } }
  } : {};

  return Category.findAndCountAll({
    limit,
    offset,
    paranoid: false,
    order: orders,
    where: {
      ...queries, ...columnQuery,
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
              SELECT COUNT(*)
              FROM call_tags AS callTag WHERE callTag.category_id = Category.id
              AND callTag.deleted_at IS NULL AND callTag.created_at
              BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (SELECT COUNT(*) FROM call_tags AS callTag WHERE
                callTag.category_id = Category.id AND callTag.created_at
                BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                AND callTag.deleted_at IS NULL) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE callTag.deleted_at IS NULL
                  AND callTag.created_at BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    },
    ...countQuery
  }).then((categoryResult) => {
    const rowsAndCounts = { count: categoryResult.count, rows: categoryResult.rows };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'category_reports');
  });
}

function getCategoryChart(query: ChartQueryParams) {
  const dateRange = checkAndGetDate(query);
  return Category.findAll({
    paranoid: false,
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                SELECT COUNT(*)
                FROM call_tags as callTag WHERE callTag.category_id = Category.id
                AND callTag.deleted_at IS NULL  AND callTag.created_at
                BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (SELECT COUNT(*) FROM call_tags AS callTag WHERE
                callTag.category_id = Category.id AND callTag.created_at
                BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                AND callTag.deleted_at IS NULL) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE callTag.deleted_at IS NULL
                  AND callTag.created_at BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    }
  }).then(categoryResult => categoryResult);
}

function filterAndPaginateSubCategory(
  query: SubCategoryReportListQueryParams,
  categoryId: number
) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const orders = orderColumnQuery(query);
  const columnQuery = columnSearchQuery(query);

  const dateRange = checkAndGetDate(query);
  const countQuery = query.count ? {
    having: { ['count']: { [Op.like]: `%${query.count}%` } }
  } : {};

  return SubCategory.findAndCountAll({
    limit,
    offset,
    order: orders,
    paranoid: false,
    where: {
      ...queries, ...columnQuery,
      category_id: categoryId
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
              SELECT COUNT(*)
              FROM call_tags AS callTag WHERE callTag.sub_category_id = SubCategory.id
              AND callTag.deleted_at IS NULL AND callTag.created_at
              BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.sub_category_id = SubCategory.id
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                ) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.category_id = ${categoryId}
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    },
    ...countQuery
  }).then((subCategoryResult) => {
    const rowsAndCounts = { count: subCategoryResult.count, rows: subCategoryResult.rows };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'sub_category_reports');
  });
}

function getSubCategoryChart(categoryId: number, query: subCategoryQueryParams) {
  const dateRange = checkAndGetDate(query);
  return SubCategory.findAll({
    paranoid: false,
    where: {
      category_id: categoryId
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                SELECT COUNT(*)
                FROM call_tags as callTag WHERE callTag.sub_category_id = SubCategory.id
                AND callTag.deleted_at IS NULL AND callTag.created_at
                BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.sub_category_id = SubCategory.id
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                ) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.category_id = ${categoryId}
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    }
  }).then(subCategoryResult => subCategoryResult);
}

function getTopThreeSubCategory(
  query: SubCategoryTopThreeListQueryParams,
  categoryId: number
) {
  const offset = SUB_CATEGORY_OFFSET_TOP_THREE;
  const limit = SUB_CATEGORY_LIMIT_TOP_THREE;
  const dateRange = checkAndGetDate(query);
  return SubCategory.findAll({
    limit,
    offset,
    paranoid: false,
    order: [[Sequelize.literal('count'), 'DESC']],
    where: {
      category_id: categoryId
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM call_tags as callTag where callTag.sub_category_id = SubCategory.id
            AND callTag.deleted_at IS NULL AND callTag.created_at
            BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
          )`),
          'count'
        ],
        [
          Sequelize.literal(`IFNULL((
            ROUND(
              (
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.sub_category_id = SubCategory.id
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                ) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.category_id = ${categoryId}
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            ), 0)`),
          'percentage'
        ]
      ],
      exclude: [
        'created_by', 'updated_by', 'created_at',
        'updated_at', 'deleted_at', 'category_id'
      ]
    }
  }).then(topThreeSubCategories => topThreeSubCategories);
}

async function generateCategoryReport(query: CategoryReportDownloadQueryParams) {
  const dateRange = checkAndGetDate(query);

  const categoryResult = await Category.findAll({
    paranoid: false,
    attributes: {
      include: [
        [
          Sequelize.literal(`(
              SELECT COUNT(*)
              FROM call_tags AS callTag WHERE callTag.category_id = Category.id
              AND callTag.deleted_at IS NULL AND callTag.created_at
              BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (SELECT COUNT(*) FROM call_tags AS callTag WHERE
                callTag.category_id = Category.id AND callTag.created_at
                BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                AND callTag.deleted_at IS NULL) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE callTag.deleted_at IS NULL
                  AND callTag.created_at BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    },
  });
  const fileName = `${new Date().getTime().toString()}.xls`;
  const downloadResult = await DownloadService(
    fileName,
    categoryResult,
    dateRange
  );
  return downloadResult;
}

async function generateSubCategoryReport(
  categoryId: number,
  query: SubCategoryReportDownloadQueryParams
) {
  const dateRange = checkAndGetDate(query);

  const subCategoryResult = await SubCategory.findAll({
    paranoid: false,
    where: { category_id: categoryId },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
              SELECT COUNT(*)
              FROM call_tags AS callTag WHERE callTag.sub_category_id = SubCategory.id
              AND callTag.deleted_at IS NULL AND callTag.created_at
              BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
            )`),
          'count'
        ],
        [
          Sequelize.literal(`(
            ROUND(
              (
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.sub_category_id = SubCategory.id
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                ) /
                (
                  SELECT COUNT(*) FROM call_tags AS callTag WHERE
                  callTag.category_id = ${categoryId}
                  AND callTag.deleted_at IS NULL AND callTag.created_at
                  BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
                )
              ) * 100, 2
            )
            )`),
          'percentage'
        ]
      ],
      exclude: ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at']
    }
  });
  const fileName = `${new Date().getTime().toString()}.xls`;
  const downloadResult = await DownloadService(
    fileName,
    subCategoryResult,
    dateRange
  );
  return downloadResult;
}

export {
  getCategoryChart,
  getSubCategoryChart,
  getTopThreeSubCategory,
  generateCategoryReport,
  generateSubCategoryReport,
  filterAndPaginateCategory,
  filterAndPaginateSubCategory
};
