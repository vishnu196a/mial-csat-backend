import Sequelize from 'sequelize';
import { DynamicReportTemplateListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: DynamicReportTemplateListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` }
  });
  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
