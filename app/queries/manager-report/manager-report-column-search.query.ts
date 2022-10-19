import Sequelize from 'sequelize';

import { ManagerReportListQueryParams } from '../../types/manager-report.controller';

const { Op } = Sequelize;

const columnSearchQuery = (query: ManagerReportListQueryParams) => {
  const { name, handler_name: handlerName } = query;
  const searchQueries: any[] = [];
  if (name) {
    const nameQuery = { name: { [Op.like]: `%${name}%` } };
    searchQueries.push(nameQuery);
  }
  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
