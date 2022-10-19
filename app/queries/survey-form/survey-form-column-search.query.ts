import Sequelize from 'sequelize';

import { SurveyFormListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: SurveyFormListQueryParams) => {
  const {
    name,
    created_by_name: createdByName,
    updated_by_name: updatedByName
  } = query;
  const searchQueries: any[] = [];
  if (name) {
    const formNameQuery = { name: { [Op.like]: `%${name}%` } };
    searchQueries.push(formNameQuery);
  }
  if (createdByName) {
    const userNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${createdByName}%`,
    });
    searchQueries.push(userNameQuery);
  }
  if (updatedByName) {
    const updatedUserNameQuery = Sequelize.where(Sequelize.col('updated_user.name'), {
      [Op.like]: `%${updatedByName}%`,
    });
    searchQueries.push(updatedUserNameQuery);
  }
  const result = {
    [Op.and]: [searchQueries],
  };
  return result;
};

export default columnSearchQuery;
