import db from '../config/database';
import moment from 'moment';
import { customAlphabet } from 'nanoid';
import { getCategoryById } from './category.service';
import { validateDateTime } from '../lib/date-validator';
import { Op, EmptyResultError } from 'sequelize';
import { getSubCategoryById } from './sub-category.service';
import { getAnExtensionsTypes } from './extensions-types.service';
import { getAbandonedCallsCount } from './abandoned-call.service';
import { getById as getTerminalById } from './terminal.service';
import { getById as getQueueCallEntryById } from './queue-call-entry.service';

import { map, size } from 'lodash';
import { paginate, paginatorResult, } from '../lib/paginator-result';

import {
  orderColumnQuery,
  columnSearchQuery,
  globalSearchQuery,
} from '../queries/call-tag';
import {
  USER_ROLE,
  Q_MINIMUM_SIZE,
  CALL_ENTRY_STATUS,
  IVR_LANGUAGE_CODES,
  MANUAL_CALL_TAG_TRUNK
} from '../config/constants';
import {
  User,
  CallTag,
  Category,
  CallEntry,
  SubCategory
} from '../models';
import {
  UserInstance,
  CallTagInstance,
  AddCallTagParams,
  updateCallTagParams,
  CallTagListQueryParams,
  AddManualCallTagParams
} from '../types';

async function getCallTagById(id: number) {
  const calltag = await CallTag.findByPk(id);
  if (!calltag) throw new EmptyResultError('Call tag not found');
  return calltag;
}

function getCallTagByCallerId(id: number) {
  return CallTag.findOne({
    where: {
      call_entry_id: id
    }
  });
}

async function getCallEntryById(id) {
  const callEntry = await CallEntry.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (!callEntry) {
    throw new EmptyResultError('Call Entry not found');
  }
  return callEntry;
}

async function detail(id: number) {
  const callTag = await CallTag.findOne({
    where: { id },
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'category',
        model: Category,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'sub_category',
        model: SubCategory,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'call_entry',
        model: CallEntry,
        paranoid: false
      }
    ],
  });
  if (!callTag) throw new EmptyResultError('Call tag not found');

  const { call_entry: callEntry } = callTag;
  let callTagType;
  if ((callEntry.status === CALL_ENTRY_STATUS.abandoned)
      && callEntry.call_back_queue) {
    callTagType = 'Call Back';
  }
  if ((callEntry.status === CALL_ENTRY_STATUS.abandoned)
    && !callEntry.call_back_queue) {
    callTagType = 'Abandoned Call';
  } else {
    callTagType = 'Normal Call';
  }

  return {
    id: callTag.id,
    answer: callTag.answer,
    question: callTag.question,
    call_type: callEntry.call_type,
    created_by: callTag.created_by,
    created_at: callTag.created_at,
    updated_at: callTag.updated_at,
    terminal_id: callTag.terminal_id,
    category_id: callTag.category_id,
    caller_name: callTag.caller_name,
    mode_of_call: callTag.mode,
    call_duration: new Date(
      (callEntry && callEntry.duration ? callEntry.duration : 0) * 1000
    ).toISOString().substring(11, 19), // converting seconds to HH:mm:ss
    call_tag_type: callTagType,
    category_name: callTag.category.name,
    call_entry_id: callTag.call_entry_id,
    created_by_id: callTag.created_by,
    contact_number: callTag.contact_number,
    created_by_name: callTag.user.name,
    sub_category_id: callTag.sub_category.id,
    call_answer_time: frameCallAnswerTime(callTag),
    sub_category_name: callTag.sub_category.name,
    call_reference_number: callEntry.uniqueid,
  };
}

async function add(attrs: AddCallTagParams, currentUser: UserInstance) {
  const {
    answer,
    question,
    caller_name: callerName,
    terminal_id: terminalId,
    category_id: categoryId,
    mode_of_call: mode,
    call_entry_id: callEntryId,
    caller_email_id: callerEmailId,
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

  return CallTag.create({
    mode,
    answer,
    question,
    created_by: currentUser.id,
    caller_name: callerName,
    terminal_id: terminal ? terminal.id : null,
    category_id: category.id,
    call_entry_id: callEntryId,
    sub_category_id: subCategory.id,
    caller_email_id: callerEmailId,
    contact_number: callEntry.callerid
  });
}

function frameCallAnswerTime(callTag: CallTagInstance): string {
  const { call_entry: callEntry } = callTag;
  const { datetime_end: end, datetime_init: start  } = callEntry;

  if ((end && !start) || (!end && start)) return '00:00:00';

  const formatEndDate = moment(end);
  const formatStartDate = moment(start);
  const callDuration = formatEndDate.diff(formatStartDate, 'seconds');

  // converting seconds to HH:mm:ss
  return new Date(callDuration * 1000).toISOString().substring(11, 19);
}

async function filterAndPaginate(query: CallTagListQueryParams, user: UserInstance) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  const orders = orderColumnQuery(query);
  const userRoleQuery = {};

  const userRole = await user.getRole();
  if (userRole.name === USER_ROLE.agent) {
    userRoleQuery['created_by'] = user.id; // tslint:disable-line
  }

  const callTags = await CallTag.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery, ...userRoleQuery },
    order: orders,
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'category',
        model: Category,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'sub_category',
        model: SubCategory,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'call_entry',
        model: CallEntry,
        paranoid: false
      }
    ],
  });
  const callTagList = map(callTags.rows, (row: CallTagInstance) => {
    const { call_entry: callEntry } = row;
    let callTagType: string;

    if ((callEntry.status === CALL_ENTRY_STATUS.abandoned)
      && callEntry.call_back_queue) {
      callTagType = 'Call Back';
    }
    if ((callEntry.status === CALL_ENTRY_STATUS.abandoned)
      && !callEntry.call_back_queue) {
      callTagType = 'Abandoned Call';
    } else {
      callTagType = 'Normal Call';
    }

    return {
      id: row.id,
      answer: row.answer,
      question: row.question,
      call_type: row.call_entry.call_type,
      created_at: row.created_at,
      updated_at: row.updated_at,
      caller_name: row.caller_name,
      date_and_time: row.call_entry.datetime_entry_queue,
      call_duration: new Date(
        (callEntry && callEntry.duration ? callEntry.duration : 0) * 1000
      ).toISOString().substring(11, 19), // converting seconds to HH:mm:ss
      category_id: row.category.id,
      created_by_id: row.created_by,
      call_tag_type: callTagType,
      mode_of_call: row.mode,
      category_name: row.category.name,
      contact_number: row.contact_number,
      created_by_name: row.user.name,
      sub_category_id: row.sub_category.id,
      call_answer_time: row.call_entry.datetime_init,
      sub_category_name: row.sub_category.name,
      call_reference_number: row.call_entry.uniqueid,
    };
  });
  const rowsAndCounts = { count: callTags.count, rows: callTagList };
  const result = paginate(rowsAndCounts, perPage, page);
  return paginatorResult(result, 'call_tags');
}

async function update(id: number, attrs: updateCallTagParams) {
  const { category_id: categoryId, sub_category_id: subCategoryId } = attrs;
  const callTag = await getCallTagById(id);
  const category = await getCategoryById(categoryId);
  const subCategory = await getSubCategoryById(subCategoryId, categoryId);
  await callTag.update({
    mode: attrs.mode_of_call,
    answer: attrs.answer,
    question: attrs.question,
    category_id: category.id,
    sub_category_id: subCategory.id,
  });
  return {
    id: callTag.id,
    answer: callTag.answer,
    question: callTag.question,
    created_at: callTag.created_at,
    updated_at: callTag.updated_at,
    caller_name: callTag.caller_name,
    mode_of_call: callTag.mode,
    contact_number: callTag.contact_number
  };
}

async function callTagDelete(id: number) {
  const callTag = await getCallTagById(id);
  return callTag.destroy();
}

function getACalltag(attrs: any) {
  return CallTag.findOne(attrs);
}

function getTotalCallsAttended() {
  return CallTag.count({
    where: {
      created_at: {
        [Op.between]: [moment().startOf('day').format(), moment().endOf('day').format()]
      }
    }
  });
}

async function getCallTagData(callEntryId: number) {
  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new EmptyResultError('Call not found');
  const callTag = await getCallTagByCallerId(Number(callEntry.id));

  const previousCallDetail = await getACalltag({
    limit: 1,
    order: [['created_at', 'DESC']],
    where: { contact_number: callEntry.callerid }
  });
  const totalCallsAttended = await getTotalCallsAttended();
  const totalCallsAbandoned = await getAbandonedCallsCount();
  const callEntryWaitingCount = await CallEntry.count({
    where: {
      status: CALL_ENTRY_STATUS.waiting,
      datetime_entry_queue: {
        [Op.between]: [moment().startOf('day').format(), moment().endOf('day').format()]
      }
    }
  });

  return {
    language: callEntry
    ? IVR_LANGUAGE_CODES[`${callEntry['queue']}`] : '', // tslint:disable-line
    caller_id: callEntry.callerid,
    caller_name: previousCallDetail?.caller_name || '',
    call_entry_id: callEntry.id,
    already_tagged: callTag ? true : false,
    call_reference_number: callEntry.uniqueid,
    total_calls_attended: totalCallsAttended,
    total_abandoned_calls: totalCallsAbandoned,
    total_call_waiting_count: callEntryWaitingCount
  };
}

async function frameCallType(callerId: string): Promise<string> {
  const extensionTypes = await getAnExtensionsTypes({
    extension: callerId
  });
  if ((!extensionTypes) && (callerId.length <= 5)) return 'Internal';
  if ((!extensionTypes) && !(callerId.length <= 5)) return 'External';

  return 'HelpPhone';
}

async function manualCallTag(attrs: AddManualCallTagParams, user: UserInstance) {
  const {
    answer,
    question,
    callerid,
    caller_name: callerName,
    category_id: categoryId,
    datetime_end: datetimeEnd,
    mode_of_call: modeOfCall,
    datetime_init: datetimeInit,
    caller_email_id: callerEmailId,
    sub_category_id: subCategoryId,
    id_queue_call_entry: idQueueCallEntry,
    datetime_entry_queue: datetimeEntryQueue
  } = attrs;

  const t = await db.transaction();
  try {
    let terminal;
    if (attrs.terminal_id) terminal = await getTerminalById(attrs.terminal_id);

    const nanoid = customAlphabet('1234567890', 17);
    const category = await getCategoryById(categoryId);
    const getCallType = await frameCallType(callerid);
    const subCategory = await getSubCategoryById(subCategoryId, categoryId);
    const queueCallEntry = await getQueueCallEntryById(idQueueCallEntry);

    validateDateTime(datetimeEntryQueue, 'Call received time');
    validateDateTime(datetimeInit, 'Call answered time');
    validateDateTime(datetimeEnd, 'Call end time');

    const formatDatetimeEnd = moment(datetimeEnd);
    const formatDatetimeInit = moment(datetimeInit);
    const formatDatetimeEntryQueue = moment(datetimeEntryQueue);

    const durationDifference = moment(formatDatetimeEnd).diff(
      moment(formatDatetimeInit), 'seconds'
    );
    const durationWaitDifference = moment(formatDatetimeInit).diff(
      moment(formatDatetimeEntryQueue), 'seconds'
    );

    const callEntry = await CallEntry.create({
      callerid,
      trunk: MANUAL_CALL_TAG_TRUNK,
      status: CALL_ENTRY_STATUS.terminada,
      uniqueid: nanoid(),
      id_agent: Number(user.id),
      duration: durationDifference,
      call_type: getCallType,
      datetime_end: datetimeEnd,
      datetime_init: datetimeInit,
      duration_wait: durationWaitDifference,
      id_queue_call_entry: Number(queueCallEntry.id),
      datetime_entry_queue: datetimeEntryQueue
    }, { transaction: t}); // tslint:disable-line

    const callTag = await CallTag.create({
      answer,
      question,
      mode: modeOfCall,
      created_by: user.id,
      caller_name: callerName,
      terminal_id: terminal ? terminal.id : null,
      category_id: category.id,
      call_entry_id: Number(callEntry.id),
      sub_category_id: subCategory.id,
      caller_email_id: callerEmailId,
      contact_number: callEntry.callerid
    }, { transaction: t }); // tslint:disable-line

    await t.commit();
    return callTag;
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

export {
  add,
  detail,
  update,
  getACalltag,
  manualCallTag,
  callTagDelete,
  getCallTagData,
  getCallTagById,
  filterAndPaginate,
  getCallTagByCallerId,
  getTotalCallsAttended
};
