import Sequelize from 'sequelize';

import { SurveyFormListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: SurveyFormListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });
  searchQueries.push(
    Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('updated_user.name'), {
      [Op.like]: `%${text}%`,
    })
  );

  const result = {
    [Op.or]: searchQueries,
  };
  return result;
};

export default globalSearchQuery;
