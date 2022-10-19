import Sequelize from 'sequelize';
import { toTitleCase } from '../../lib/text-case-converter';
import { AbandonedCallsListQueryParams, CalledbackQueueListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (
  query: AbandonedCallsListQueryParams
    | CalledbackQueueListQueryParams) => {
  const {
    contact_number: contactNumber,
    call_reference_number: callReferenceNumber,
    type_of_called_back_queue: callBackQueue
  } = query;
  const searchQueries: any[] = [];
  if (contactNumber) {
    const contactNumberQuery = { callerid: { [Op.like]: `%${contactNumber}%` } };
    searchQueries.push(contactNumberQuery);
  }

  if (callBackQueue) {
    const checkAndGetCallBackQueueType = toTitleCase(callBackQueue) === 'Abandoned Call' ? [0]
      : toTitleCase(callBackQueue) === 'Call Back' ? [1] : [0, 1];
    const callBackQueueQuery = { call_back_queue: { [Op.in]: checkAndGetCallBackQueueType } };
    searchQueries.push(callBackQueueQuery);
  }

  if (callReferenceNumber) {
    const callReferenceNumberQuery = { uniqueid: { [Op.like]: `${callReferenceNumber}%` } };
    searchQueries.push(callReferenceNumberQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
