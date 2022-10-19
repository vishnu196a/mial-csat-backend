import Sequelize from 'sequelize';
import { ContactListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: ContactListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    email: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    phone: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    landline_number: { [Op.like]: `%${text}%` },
  });
  searchQueries.push(
    Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('terminal.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('category.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('sub_category.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  const result = {
    [Op.or]: searchQueries,
  };
  return result;
};

export default globalSearchQuery;
