import { EmptyResultError, Sequelize } from 'sequelize';
import { map, size } from 'lodash';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { Terminal, TerminalInformation } from '../models';
import { globalSearchQuery, columnSearchQuery } from '../queries/terminal-information';

import {
  UserInstance,
  TerminalInformationInstance,
  AddTerminalInformationParams,
  TerminalInformationRowsAndCount,
  TerminalInformationUpdateParams,
  TerminalInformationListQueryParams,
} from '../types';

async function filterAndPaginate(query: TerminalInformationListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return TerminalInformation.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [[Sequelize.literal('terminal.name'), 'ASC']],
    include: {
      as: 'terminal',
      model: Terminal,
      attributes: ['id', 'name']
    }
  }).then((terminalInformations: TerminalInformationRowsAndCount) => {
    const terminalInformationList = map(
      terminalInformations.rows,
      (row: TerminalInformationInstance) => {
        const data = {
          id: row.id,
          phone: row.phone,
          email: row.email,
          category: row.category,
          location: row.location,
          shop_name: row.shop_name,
          created_at: row.created_at,
          updated_at: row.updated_at,
          description: row.description,
          terminal_id: row.terminal.id,
          terminal_name: row.terminal.name
        };
        return data;
      });
    const rowsAndCounts = { count: terminalInformations.count, rows: terminalInformationList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'terminal_informations');
  });
}

async function getTerminlById(id: number) {
  const terminal = await Terminal.findByPk(id);
  if (!terminal) throw new EmptyResultError('Terminal not found');

  return terminal;
}

async function getTerminalInformationById(id: number) {
  const terminalInformation = await TerminalInformation.findByPk(id);
  if (!terminalInformation) throw new EmptyResultError('Terminal Information not found');
  return terminalInformation;
}

async function add(attrs: AddTerminalInformationParams, currentUser: UserInstance) {
  const { terminal_id: terminalId } = attrs;
  const terminal =  await getTerminlById(terminalId);
  const terminalInfoCreateAttrs = {
    phone: attrs.phone,
    email: attrs.email,
    category: attrs.category,
    location: attrs.location,
    terminal_id: terminal.id,
    shop_name: attrs.shop_name,
    created_by: currentUser.id,
    description: attrs.description
  };
  return TerminalInformation.create(terminalInfoCreateAttrs);
}

async function detail(id: number) {
  const terminalInformation = await TerminalInformation.findOne({
    where: { id },
    include:[{
      as: 'terminal',
      model: Terminal,
      attributes: ['id', 'name']
    }]
  });
  if (!terminalInformation) throw new EmptyResultError('Terminal information not found');
  return terminalInformation;
}

async function update(
  id: number,
  attrs: TerminalInformationUpdateParams,
  currentUser: UserInstance
  ) {
  const { terminal_id: terminalId } = attrs;
  const terminal = await getTerminlById(terminalId);
  const terminalInformation = await getTerminalInformationById(id);

  const terminlInfoUpdateAttrs = {
    phone: attrs.phone,
    email: attrs.email,
    category: attrs.category,
    location: attrs.location,
    terminal_id: terminal.id,
    updated_by: currentUser.id,
    shop_name: attrs.shop_name,
    description: attrs.description
  };
  return terminalInformation.update(terminlInfoUpdateAttrs);
}

async function terminalInformationDelete(id:number) {
  const terminalInformation = await getTerminalInformationById(id);
  return terminalInformation.destroy();
}

export {
  add,
  detail,
  update,
  filterAndPaginate,
  terminalInformationDelete
};
