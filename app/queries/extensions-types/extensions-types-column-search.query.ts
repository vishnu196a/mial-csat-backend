import Sequelize from 'sequelize';
import { ExtensionTypeListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: ExtensionTypeListQueryParams) => {
  const { type, extension } = query;
  const searchQueries: any[] = [];
  if (type) {
    const typeQuery = { type: { [Op.like]: `%${type}%` } };
    searchQueries.push(typeQuery);
  }
  if (extension) {
    const extensionQuery = { extension: { [Op.like]: `%${extension}%` } };
    searchQueries.push(extensionQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
