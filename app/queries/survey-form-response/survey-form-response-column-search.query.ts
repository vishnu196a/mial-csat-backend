import Sequelize from 'sequelize';
import { SurveyFormResponseListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: SurveyFormResponseListQueryParams) => {
  const {
    user_name: userName,
    survey_form_name: surveyFormName
  } = query;
  const searchQueries: any[] = [];
  if (surveyFormName) {
    const surveryFormNameQuery = Sequelize.where(Sequelize.col('survey_form.name'), {
      [Op.like]: `%${surveyFormName}%`
    });
    searchQueries.push(surveryFormNameQuery);
  }
  if (userName) {
    const userNameNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${userName}%`
    });
    searchQueries.push(userNameNameQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
