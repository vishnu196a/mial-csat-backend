import Sequelize from 'sequelize';

const { Op } = Sequelize;
import { TerminalListQueryParams } from '../../types';

const columnSearchQuery = (query: TerminalListQueryParams) => {
  const { name } = query;
  const searchQueries: any[] = [];
  if (name) {
    const nameQuery = { name: { [Op.like]: `%${name}%` } };
    searchQueries.push(nameQuery);
  }
  const result = {
    [Op.and]: [searchQueries],
  };
  return result;
};

export default columnSearchQuery;
