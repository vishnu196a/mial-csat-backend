import Sequelize from 'sequelize';

const { Op } = Sequelize;
import { DownloadQueueListQueryParams } from '../../types';

const columnSearchQuery = (query: DownloadQueueListQueryParams) => {
  const {
    name,
    status,
    user_name: userName
  } = query;
  const searchQueries: any[] = [];
  if (name) {
    const nameQuery = { name: { [Op.like]: `%${name}%` } };
    searchQueries.push(nameQuery);
  }
  if (status) {
    const statusQuery = { status: { [Op.like]: `${status}%%` } };
    searchQueries.push(statusQuery);
  }
  if (userName) {
    const userNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${userName}%`
    });
    searchQueries.push(userNameQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
