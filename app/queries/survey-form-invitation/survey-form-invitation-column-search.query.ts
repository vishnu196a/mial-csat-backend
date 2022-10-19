import Sequelize from 'sequelize';
import { SurveyFormInvitationListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: SurveyFormInvitationListQueryParams) => {
  const {
    type,
    contact,
    call_id: callId,
    resent_by_name: resentBy,
    survey_form_name: formName
  } = query;
  const searchQueries: any[] = [];

  if (formName) {
    const formNameQuery = Sequelize.where(Sequelize.col('survey_form.name'), {
      [Op.like]: `%${formName}%`
    });
    searchQueries.push(formNameQuery);
  }
  if (resentBy) {
    const userNameQuery = Sequelize.where(Sequelize.col('users.name'), {
      [Op.like]: `%${resentBy}%`
    });
    searchQueries.push(userNameQuery);
  }
  if (callId) {
    const callIdQuery = { call_id: { [Op.like]: `%${callId}%` } };
    searchQueries.push(callIdQuery);
  }
  if (type) {
    const typeQuery = { type: { [Op.like]: `%${type}%` } };
    searchQueries.push(typeQuery);
  }
  if (contact) {
    const contactQuery = { contact: { [Op.like]: `%${contact}%` } };
    searchQueries.push(contactQuery);
  }
  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
