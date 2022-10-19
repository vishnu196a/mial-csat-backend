import Sequelize from 'sequelize';
import { toTitleCase } from '../../lib/text-case-converter';
import { AbandonedCallsListQueryParams, CalledbackQueueListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (
  query: AbandonedCallsListQueryParams
    | CalledbackQueueListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    callerid: { [Op.like]: `%${text}%` },
  });

  if (text) {
    const checkAndGetCallBackQueueType = toTitleCase(text) === 'Abandoned Call' ? [0]
      : toTitleCase(text) === 'Call Back' ? [1] : [0, 1];
    const callBackQueueQuery = { call_back_queue: { [Op.in]: checkAndGetCallBackQueueType } };
    searchQueries.push(callBackQueueQuery);
  }

  searchQueries.push({
    uniqueid: { [Op.like]: `${text}%` }
  });

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
