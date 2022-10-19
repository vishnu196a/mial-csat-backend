import moment from 'moment';
import Sequelize from 'sequelize';

import { validateDate } from '../../lib/date-validator';
import { CallTagListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: CallTagListQueryParams) => {
  const {
    to,
    from,
    answer,
    question,
    call_type: callType,
    caller_name: callerName,
    mode_of_call: mode,
    contact_number: contactNumber,
    created_by_name: createdByName,
    category_name: categoryName,
    sub_category_name: subCategoryName,
  } = query;
  const searchQueries: any[] = [];
  if (question) {
    const questionQuery = { question: { [Op.like]: `%${question}%` } };
    searchQueries.push(questionQuery);
  }
  if (answer) {
    const answerQuery = { answer: { [Op.like]: `%${answer}%` } };
    searchQueries.push(answerQuery);
  }
  if (callerName) {
    const callerNameQuery = {
      caller_name: { [Op.like]: `%${callerName}%` }
    };
    searchQueries.push(callerNameQuery);
  }
  if (contactNumber) {
    const contactNumberQuery = {
      contact_number: { [Op.like]: `%${contactNumber}%` }
    };
    searchQueries.push(contactNumberQuery);
  }
  if (mode) {
    const modeQuery = { [Op.like]: `%${mode}%` };
    searchQueries.push(modeQuery);
  }
  if (callType) {
    const callTypeQuery = Sequelize.where(Sequelize.col('call_entry.call_type'), {
      [Op.like]: `%${callType}%`,
    });
    searchQueries.push(callTypeQuery);
  }
  if (createdByName) {
    const userNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${createdByName}%`,
    });
    searchQueries.push(userNameQuery);
  }
  if (categoryName) {
    const categoryNameQuery = Sequelize.where(Sequelize.col('category.name'), {
      [Op.like]: `%${categoryName}%`,
    });
    searchQueries.push(categoryNameQuery);
  }
  if (subCategoryName) {
    const subCategoryNameQuery = Sequelize.where(Sequelize.col('sub_category.name'), {
      [Op.like]: `%${subCategoryName}%`,
    });
    searchQueries.push(subCategoryNameQuery);
  }

  if (to && from) {
    validateDate(to, from);
    const dateQuery = { created_at: {
      [Op.between]: [
        moment(from).format(),
        moment(to).format()
      ]
    }};
    searchQueries.push(dateQuery);
  }

  const result = {
    [Op.and]: [searchQueries],
  };
  return result;
};

export default columnSearchQuery;
