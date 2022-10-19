import Sequelize from 'sequelize';
import { CallTagListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: CallTagListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    question: { [Op.like]: `%${text}%` },
  });
  searchQueries.push({
    answer: { [Op.like]: `%${text}%` },
  });
  searchQueries.push(
    Sequelize.where(Sequelize.col('call_entry.call_type'), {
      [Op.like]: `%${text}%`
    })
  );
  searchQueries.push(
    Sequelize.where(Sequelize.col('user.name'), {
      [Op.like]: `%${text}%`,
    })
  );
  searchQueries.push({
    mode: { [Op.like]: `%${text}%` }
  });
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
