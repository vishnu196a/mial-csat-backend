import Sequelize from 'sequelize';
import { UserListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: UserListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    email: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    mobile_no: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    employee_number: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    agent_code: { [Op.like]: `%${text}%` },
  });
  const roleNameQuery = Sequelize.where(Sequelize.col('role.name'), {
    [Op.like]: `%${text}%`
  });
  searchQueries.push(roleNameQuery);

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
