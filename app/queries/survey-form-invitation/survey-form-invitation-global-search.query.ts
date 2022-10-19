import Sequelize from 'sequelize';
import { SurveyFormInvitationListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: SurveyFormInvitationListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push(
    Sequelize.where(Sequelize.col('survey_form.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('users.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push({
    call_id: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    type: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    contact: { [Op.like]: `%${text}%` },
  });
  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
