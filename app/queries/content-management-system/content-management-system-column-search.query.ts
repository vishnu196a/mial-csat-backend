import Sequelize from 'sequelize';
import { ContentManagementSystemListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: ContentManagementSystemListQueryParams) => {
  const searchQueries: any[] = [];
  const {
    title,
    created_by_name: createdByName,
  } = query;

  if (title) {
    const titleQuery = { title: { [Op.like]: `%${title}%` } };
    searchQueries.push(titleQuery);
  }

  if (createdByName) {
    const createdByNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${createdByName}%`
    });
    searchQueries.push(createdByNameQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
