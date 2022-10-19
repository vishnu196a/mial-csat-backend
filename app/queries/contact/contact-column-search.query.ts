import Sequelize from 'sequelize';
import { ContactListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: ContactListQueryParams) => {
  const {
    name,
    email,
    mobile_no: mobileNumber,
    terminal_name: terminalName,
    category_name: categoryName,
    created_by_name: createdByName,
    landline_number: landLineNumber,
    sub_category_name: subCategoryName,
  } = query;
  const searchQueries: any[] = [];
  if (name) {
    const nameQuery = { name: { [Op.like]: `%${name}%` } };
    searchQueries.push(nameQuery);
  }
  if (email) {
    const emailQuery = { email: { [Op.like]: `%${email}%` } };
    searchQueries.push(emailQuery);
  }
  if (mobileNumber) {
    const mobileNumberQuery = { phone: { [Op.like]: `%${mobileNumber}%` } };
    searchQueries.push(mobileNumberQuery);
  }
  if (landLineNumber) {
    const landLineNumberQuery = { landline_number: { [Op.like]: `%${landLineNumber}%` } };
    searchQueries.push(landLineNumberQuery);
  }
  if (terminalName) {
    const terminalNameQuery = Sequelize.where(Sequelize.col('terminal.name'), {
      [Op.like]: `%${terminalName}%`,
    });
    searchQueries.push(terminalNameQuery);
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
  if (createdByName) {
    const createdByNameQuery = Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${createdByName}%`,
    });
    searchQueries.push(createdByNameQuery);
  }
  const result = {
    [Op.and]: [searchQueries],
  };
  return result;
};

export default columnSearchQuery;
