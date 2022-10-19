import Sequelize from 'sequelize';
import { TerminalInformationListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: TerminalInformationListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    phone: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    email: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    category: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    location: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    shop_name: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    description: { [Op.like]: `%${text}%` },
  });
  const terminalNameQuery = Sequelize.where(Sequelize.col('terminal.name'), {
    [Op.like]: `%${text}%`
  });
  searchQueries.push(terminalNameQuery);

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
