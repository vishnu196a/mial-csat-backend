import Sequelize from 'sequelize';
import { UserListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: UserListQueryParams) => {
  const {
    name,
    email,
    role: roleName,
    agent_code: agentCode,
    mobile_no: mobileNumber,
    employee_number: employeeNumber
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
    const mobileNumberQuery = { mobile_no: { [Op.like]: `%${mobileNumber}%` } };
    searchQueries.push(mobileNumberQuery);
  }
  if (employeeNumber) {
    const employeeNumberQuery = { employee_number: { [Op.like]: `%${employeeNumber}%` } };
    searchQueries.push(employeeNumberQuery);
  }
  if (agentCode) {
    const agentCodeQuery = { agent_code: { [Op.like]: `%${agentCode}%` } };
    searchQueries.push(agentCodeQuery);
  }
  if (roleName) {
    const roleNameQuery = Sequelize.where(Sequelize.col('role.name'), {
      [Op.like]: `%${roleName}%`
    });
    searchQueries.push(roleNameQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
