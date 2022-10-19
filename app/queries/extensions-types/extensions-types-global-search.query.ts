import { Op } from 'sequelize';
import { ExtensionTypeListQueryParams } from '../../types';

const globalSearchQuery = (query: ExtensionTypeListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    type: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    extension: { [Op.like]: `%${text}%` },
  });

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
