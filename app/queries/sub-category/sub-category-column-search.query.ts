import Sequelize from 'sequelize';
import { SubCategoryListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: SubCategoryListQueryParams) => {
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
