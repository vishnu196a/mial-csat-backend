import moment from 'moment';
import { map, size } from 'lodash';
import { validateDate } from '../lib/date-validator';
import { getCategoryById } from './category.service';
import { getSubCategoryById } from './sub-category.service';
import { Op, EmptyResultError } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { getById as getTerminalById } from './terminal.service';
import { CallTag, CallEntry, QueueCallEntry } from '../models';
import { globalSearchQuery, columnSearchQuery } from '../queries/abandoned-call';

import {
  getACalltag,
  getCallTagByCallerId
} from './call-tag.service';
import {
  Q_MINIMUM_SIZE,
  CALL_ENTRY_STATUS,
  IVR_LANGUAGE_CODES
} from '../config/constants';
import {
  UserInstance,
  CallEntryInstance,
  AbandonedCallRowsAndCount,
  CallbackQueueListQueryParams,
  AbandonedCallsListQueryParams,
  CalledbackQueueListQueryParams,
  AddCallTagParams,
} from '../types';

function filterAndPaginate(query: AbandonedCallsListQueryParams) {
  const { to, from } = query;
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  let dateQuery = {};
  if (to && from) {
    validateDate(to, from);
    dateQuery = { datetime_entry_queue: {
      [Op.between]: [
        moment(from).format(),
        moment(to).format()
      ]
    }};
  }

  return CallEntry.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
      ...dateQuery,
      ...columnQuery,
      status: CALL_ENTRY_STATUS.abandoned,
      call_back_queue: false,
      abandoned_call_updated_by: {
        [Op.eq]: null
      }
    },
    order: [['id', 'DESC']],
    attributes: ['id', 'callerid', 'uniqueid', 'datetime_entry_queue']
  }).then((abandonedCalls: AbandonedCallRowsAndCount) => {
    const abandonedCallsList = map(abandonedCalls.rows, (row: CallEntryInstance) => {
      const data = {
        id: row.id,
        date_and_time: row.datetime_entry_queue,
        contact_number: row.callerid,
        call_reference_number: row.uniqueid
      };
      return data;
    });
    const rowsAndCounts = { count: abandonedCalls.count, rows: abandonedCallsList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'abandoned_calls');
  });
}

async function getAnAbandonedCall(id: number) {
  const abandonedCall = await CallEntry.findOne({
    where: {
      id,
      status: CALL_ENTRY_STATUS.abandoned,
      abandoned_call_updated_by: {
        [Op.eq]: null
      }
    }
  });
  if (!abandonedCall) throw new EmptyResultError('Abandoned call not found');

  return abandonedCall;
}

async function getACallBackQueue(id: number) {
  const callBackQueue = await CallEntry.findOne({
    where: {
      id,
      status: CALL_ENTRY_STATUS.abandoned,
      call_back_queue: true,
      abandoned_call_updated_by: {
        [Op.eq]: null
      }
    }
  });
  if (!callBackQueue) throw new EmptyResultError('Call back queue not found');

  return callBackQueue;
}

async function update(id: number, currentUser: UserInstance, attrs: AddCallTagParams) {
  const abandonedCall = await getAnAbandonedCall(id);
  await abandonedCall.update({
    reason: attrs.answer,
    abandoned_call_updated_by: currentUser.id
  });

  const {
    answer,
    question,
    caller_name: callerName,
    terminal_id: terminalId,
    category_id: categoryId,
    mode_of_call: modeOfCall,
    call_entry_id: callEntryId,
    sub_category_id: subCategoryId
  } = attrs;

  const callTag = await getCallTagByCallerId(callEntryId);
  if (callTag) throw new Error('Call already tagged');

  let terminal;
  if (terminalId) terminal = await getTerminalById(terminalId);

  const category = await getCategoryById(categoryId);
  const subCategory = await getSubCategoryById(subCategoryId, categoryId);

  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new Error('Call entry not found');

  const callTagAttributes = {
    answer,
    question,
    mode: modeOfCall,
    created_by: currentUser.id,
    caller_name: callerName,
    terminal_id: terminal ? terminal.id : null,
    category_id: category.id,
    call_entry_id: callEntryId,
    sub_category_id: subCategory.id,
    contact_number: callEntry.callerid
  };

  const newCallTag = CallTag.create(callTagAttributes);
  await callEntry.update({ abandoned_call_updated_by: currentUser.id });
  return newCallTag;
}

async function detailForCallTag(id: number) {
  const abandonedCall = await getAnAbandonedCall(id);

  const previousCallDetail = await getACalltag({
    limit: 1,
    order: [['created_at', 'DESC']],
    where: { contact_number: abandonedCall.callerid }
  });
  const queueCallEntry = await QueueCallEntry.findByPk(
    Number(abandonedCall.id_queue_call_entry)
  );

  return {
    id: abandonedCall.id,
    language: queueCallEntry
        ? IVR_LANGUAGE_CODES[`${queueCallEntry['queue']}`] : '', // tslint:disable-line
    caller_id: abandonedCall.callerid,
    caller_name: previousCallDetail?.caller_name || '',
    call_entry_id: abandonedCall.id,
    call_reference_number: abandonedCall.uniqueid
  };
}

function filterAndPaginateCallBackQueue(query: CallbackQueueListQueryParams) {
  const { to, from } = query;
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  let dateQuery = {};
  if (to && from) {
    validateDate(to, from);
    dateQuery = { datetime_entry_queue: {
      [Op.between]: [
        moment(from).format(),
        moment(to).format()
      ]
    }};
  }

  return CallEntry.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
      ...dateQuery,
      ...columnQuery,
      status: CALL_ENTRY_STATUS.abandoned,
      call_back_queue: true,
      abandoned_call_updated_by: {
        [Op.eq]: null
      }
    },
    order: [['id', 'DESC']],
    attributes: ['id', 'callerid', 'uniqueid', 'datetime_entry_queue']
  }).then((callBackQueue: AbandonedCallRowsAndCount) => {
    const abandonedCallsList = map(callBackQueue.rows, (row: CallEntryInstance) => {
      const data = {
        id: row.id,
        date_and_time: row.datetime_entry_queue,
        contact_number: row.callerid,
        call_reference_number: row.uniqueid
      };
      return data;
    });
    const rowsAndCounts = { count: callBackQueue.count, rows: abandonedCallsList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'call_back_queues');
  });
}

function filterAndPaginateCalledBackQueue(
  query: CalledbackQueueListQueryParams,
  user: UserInstance
) {
  const { to, from } = query;
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  let dateQuery = {};
  if (to && from) {
    validateDate(to, from);
    dateQuery = { datetime_entry_queue: {
      [Op.between]: [
        moment(from).format(),
        moment(to).format()
      ]
    }};
  }

  return CallEntry.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
      ...dateQuery,
      ...columnQuery,
      status: CALL_ENTRY_STATUS.abandoned,
      abandoned_call_updated_by: user.id
    },
    order: [['id', 'DESC']],
    attributes: [
      'id', 'callerid', 'reason', 'uniqueid',
      'datetime_entry_queue', 'call_back_queue'
    ]
  }).then((calledBackQueue: AbandonedCallRowsAndCount) => {
    const abandonedCallsList = map(calledBackQueue.rows, (row: CallEntryInstance) => {
      const data = {
        id: row.id,
        reason: row.reason,
        date_and_time: row.datetime_entry_queue,
        contact_number: row.callerid,
        call_reference_number: row.uniqueid,
        type_of_called_back_queue: row.call_back_queue ? 'Call Back' : 'Abandoned Call'
      };
      return data;
    });
    const rowsAndCounts = { count: calledBackQueue.count, rows: abandonedCallsList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'called_back_queues');
  });
}

function getAbandonedCallsCount() {
  return CallEntry.count({
    where: {
      status: CALL_ENTRY_STATUS.abandoned,
      call_back_queue: false,
      abandoned_call_updated_by: {
        [Op.eq]: null
      },
      datetime_entry_queue: {
        [Op.between]: [moment().startOf('day').format(), moment().endOf('day').format()]
      }
    }
  });
}

export {
  update,
  detailForCallTag,
  getACallBackQueue,
  filterAndPaginate,
  getAnAbandonedCall,
  getAbandonedCallsCount,
  filterAndPaginateCallBackQueue,
  filterAndPaginateCalledBackQueue
};
