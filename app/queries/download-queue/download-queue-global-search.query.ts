import Sequelize from 'sequelize';
import { DownloadQueueListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: DownloadQueueListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });
  const userNameQuery = Sequelize.where(Sequelize.col('user.name'), {
    [Op.like]: `%${text}%`
  });
  searchQueries.push(userNameQuery);

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
