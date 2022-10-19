import Sequelize from 'sequelize';
import { TerminalInformationListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: TerminalInformationListQueryParams) => {
  const {
    phone,
    email,
    category,
    location,
    description,
    shop_name: shopName,
    terminal_name: terminalName
  } = query;
  const searchQueries: any[] = [];
  if (phone) {
    const phoneQuery = { phone: { [Op.like]: `%${phone}%` } };
    searchQueries.push(phoneQuery);
  }
  if (email) {
    const emailQuery = { email: { [Op.like]: `%${email}%` } };
    searchQueries.push(emailQuery);
  }
  if (category) {
    const categoryQuery = { category: { [Op.like]: `%${category}%` } };
    searchQueries.push(categoryQuery);
  }
  if (location) {
    const locationQuery = { location: { [Op.like]: `%${location}%` } };
    searchQueries.push(locationQuery);
  }
  if (description) {
    const descriptionQuery = { description: { [Op.like]: `%${description}%` } };
    searchQueries.push(descriptionQuery);
  }
  if (shopName) {
    const shopNameQuery = { shop_name: { [Op.like]: `%${shopName}%` } };
    searchQueries.push(shopNameQuery);
  }
  if (terminalName) {
    const terminalNameQuery = Sequelize.where(Sequelize.col('terminal.name'), {
      [Op.like]: `%${terminalName}%`
    });
    searchQueries.push(terminalNameQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
