import Sequelize from 'sequelize';
import { ManagerReportListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: ManagerReportListQueryParams) => {
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
