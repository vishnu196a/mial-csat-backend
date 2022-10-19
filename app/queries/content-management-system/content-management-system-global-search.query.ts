import Sequelize from 'sequelize';
import { ContentManagementSystemListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: ContentManagementSystemListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];

  searchQueries.push({
    title: { [Op.like]: `%${text}%` },
  });

  searchQueries.push({
    content: { [Op.like]: `%${text}%` },
  });

  searchQueries.push(
    Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${text}%`
    })
  );

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
