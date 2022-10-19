import { Sequelize } from 'sequelize';

import {
  CategoryReportListQueryParams,
  SubCategoryReportListQueryParams
} from '../../types';

const orderColumnQuery = (
  query: CategoryReportListQueryParams | SubCategoryReportListQueryParams
) => {
  const orders: any[] = [];
  const {
    o_name: name,
    o_count: count
  } = query;

  if (name) {
    orders.push(['name', name]);
  }
  if (count) {
    orders.push([[Sequelize.literal('count'), count]]);
  } else {
    orders.push([[Sequelize.literal('count'), 'DESC']]);
  }
  return orders;
};

export default orderColumnQuery;
