import Sequelize from 'sequelize';

import {
  CategoryReportListQueryParams,
  SubCategoryReportListQueryParams
} from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (
  query: CategoryReportListQueryParams | SubCategoryReportListQueryParams
) => {
  const { name } = query;
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
