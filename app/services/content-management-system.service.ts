import { map, size } from 'lodash';
import { EmptyResultError } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/content-management-system';
import { Q_MINIMUM_SIZE, CONTENT_MANAGEMENT_SYSTEM_TYPE } from '../config/constants';

import {
  User,
  ContentManagementSystem
} from '../models';
import {
  UserInstance,
  ContentManagementSystemInstance,
  AddContentManagementSystemParams,
  ContentManagementSystemUpdateParams,
  ContentManagementSystemRowsAndCount,
  ContentManagementSystemListQueryParams
} from '../types';

function add(
  attrs: AddContentManagementSystemParams,
  user: UserInstance
): Promise<ContentManagementSystemInstance> {
  return ContentManagementSystem.create({
    ...attrs,
    type: CONTENT_MANAGEMENT_SYSTEM_TYPE.faq,
    created_by: user.id
  });
}

async function filterAndPaginate(query: ContentManagementSystemListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  return ContentManagementSystem.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['title', 'ASC']],
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      }
    ]
  }).then((cmsResult: ContentManagementSystemRowsAndCount) => {
    const cmsList = map(cmsResult.rows, (row: ContentManagementSystemInstance) => {
      const data = {
        id: row.id,
        title: row.title,
        created_at: row.created_at,
        updated_at: row.updated_at,
        created_by_id: row.user.id,
        created_by_name: row.user.name
      };
      return data;
    });
    const rowsAndCounts = { count: cmsResult.count, rows: cmsList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'content_management_system');
  });
}

async function detail(id: number) {
  const cmsResult = await ContentManagementSystem.findOne({
    where: { id },
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      }
    ]
  });

  if (!cmsResult) throw new EmptyResultError('Content Management System not found');

  return {
    ...cmsResult.toJSON(),
    created_by_name: cmsResult.user.name
  };
}

async function getContentManagementSystemById(id: number) {
  const cms = await ContentManagementSystem.findByPk(id);
  if (!cms) throw new EmptyResultError('Content Managent System not found');

  return cms;
}

async function update(id: number, attrs: ContentManagementSystemUpdateParams) {
  const contentManagementSystem = await getContentManagementSystemById(id);
  const updatedCms = await contentManagementSystem.update({
    type: CONTENT_MANAGEMENT_SYSTEM_TYPE.faq,
    title: attrs.title,
    content: attrs.content
  });

  return {
    ...updatedCms.toJSON()
  };
}

async function contentManagementSystemDelete(id: number) {
  try {
    const cmsResult = await getContentManagementSystemById(id);
    const deletedCms = await cmsResult.destroy();
    return deletedCms;
  } catch (error) {
    throw error;
  }
}

export {
  add,
  update,
  detail,
  filterAndPaginate,
  contentManagementSystemDelete,
  getContentManagementSystemById
};
