import { size } from 'lodash';
import { Terminal } from '../models';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { EmptyResultError } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { columnSearchQuery, globalSearchQuery } from '../queries/terminal';

import {
  UserInstance,
  TerminalInstance,
  AddTerminalParams,
  TerminalRowsAndCount,
  TerminalUpdateParams,
  TerminalListQueryParams
} from '../types';

function add(
  attrs: AddTerminalParams,
  currentUser: UserInstance
): Promise<TerminalInstance> {
  return Terminal.create({
    ...attrs,
    created_by: currentUser.id
  });
}

function filterAndPaginate(query: TerminalListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  return Terminal.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['name', 'ASC']]
  })
    .then((terminals: TerminalRowsAndCount) => {
      const rowsAndcounts = { count: terminals.count, rows: terminals.rows };
      const result = paginate(rowsAndcounts, perPage, page);
      return paginatorResult(result, 'terminals');
    })
    .catch((error) => {
      throw error;
    });
}

async function getById(id: number) {
  const terminal = await Terminal.findByPk(id);
  if (!terminal) throw new EmptyResultError('Terminal not found');

  return terminal;
}

function detail(id) {
  return getById(id);
}

async function update(
  id: number,
  attrs: TerminalUpdateParams
): Promise<TerminalInstance> {
  const terminal = await getById(id);
  return terminal.update({ name: attrs.name });
}

function listAllTerminals() {
  return Terminal.findAll({ attributes: ['id', 'name'] });
}

async function terminalDelete(id: number) {
  const terminal = await getById(id);
  return terminal.destroy();
}

export {
  add,
  detail,
  update,
  getById,
  terminalDelete,
  listAllTerminals,
  filterAndPaginate
};
