import Sequelize from 'sequelize';
import { SubCategoryListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: SubCategoryListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
