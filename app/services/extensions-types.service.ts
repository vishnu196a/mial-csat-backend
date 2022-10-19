import { map, size } from 'lodash';
import { ExtensionType } from '../models';
import { EmptyResultError } from 'sequelize';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/extensions-types';

import {
  ExtensionTypeInstance,
  AddExtensionTypeParams,
  ExtensionTypeUpdateParams,
  ExtensionTypeRowsAndCount,
  ExtensionTypeListQueryParams
} from '../types';

function getExtensionTypeById(id: number) {
  return ExtensionType.findByPk(id)
    .then((extension: ExtensionTypeInstance | null) => {
      if (!extension) {
        throw new EmptyResultError('Extension not found');
      }
      return extension;
    });
}

function add(attrs: AddExtensionTypeParams) {
  return ExtensionType.create(attrs);
}

function detail(id: number) {
  return getExtensionTypeById(id);
}

function getAnExtensionsTypes(attrs: any) {
  return ExtensionType.findOne({ where: attrs });
}

async function update(id: number, attrs: ExtensionTypeUpdateParams) {
  const extensionType = await getExtensionTypeById(id);
  return extensionType.update(attrs);
}

async function filterAndPaginate(query: ExtensionTypeListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return ExtensionType.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['id', 'ASC']],
  }).then((extensionsTypes: ExtensionTypeRowsAndCount) => {
    const rowsAndCounts = { count: extensionsTypes.count, rows: extensionsTypes.rows };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'extensions_types');
  });
}

async function extensionTypeDelete(id: number) {
  const extensionType = await getExtensionTypeById(id);
  return extensionType.destroy();
}

export {
  add,
  update,
  detail,
  filterAndPaginate,
  extensionTypeDelete,
  getAnExtensionsTypes,
  getExtensionTypeById
};
