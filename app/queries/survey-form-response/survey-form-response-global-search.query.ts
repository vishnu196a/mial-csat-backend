import Sequelize from 'sequelize';
import { SurveyFormResponseListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: SurveyFormResponseListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push(
    Sequelize.where(Sequelize.col('survey_form.name'), {
      [Op.like]: `%${text}%`
    })
  );
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
