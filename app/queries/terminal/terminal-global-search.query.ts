import Sequelize from 'sequelize';

const { Op } = Sequelize;
import { TerminalListQueryParams } from '../../types';

const globalSearchQuery = (query: TerminalListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });
  const result = {
    [Op.or]: searchQueries,
  };
  return result;
};

export default globalSearchQuery;
