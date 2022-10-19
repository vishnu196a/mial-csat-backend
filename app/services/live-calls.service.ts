import moment from 'moment';
import { Op } from 'sequelize';
import { UserInstance } from '../types';
import { getAbandonedCallsCount } from './abandoned-call.service';
import { CALL_ENTRY_STATUS, IVR_LANGUAGE_CODES } from '../config/constants';

import {
  CallEntry,
  LiveCallEntry,
  QueueCallEntry
} from '../models';
import {
  getACalltag,
  getCallTagByCallerId,
  getTotalCallsAttended
} from '../services/call-tag.service';

async function list(user: UserInstance) {
  const liveCallEntry = await LiveCallEntry.findOne({
    where: {
      id_agent: user.id,
    },
    order: [['datetime_init', 'DESC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  const callEntryWaitingCount = await CallEntry.count({
    where: {
      status: CALL_ENTRY_STATUS.waiting,
      datetime_entry_queue: {
        [Op.between]: [moment().startOf('day').format(), moment().endOf('day').format()]
      }
    }
  });
  const totalCallsAttended = await getTotalCallsAttended();
  const totalCallsAbandoned = await getAbandonedCallsCount();
  if (liveCallEntry) {
    let alreadyTagged = false;
    const callEntry = await CallEntry.findOne({
      where: {
        id: liveCallEntry.id_call_entry
      },
      attributes: ['id', 'call_type']
    });
    const callTag = await getCallTagByCallerId(Number(liveCallEntry.id_call_entry));
    const previousCallDetail = await getACalltag({
      limit: 1,
      order: [['created_at', 'DESC']],
      where: { contact_number: liveCallEntry.callerid }
    });
    const queueCallEntry = await QueueCallEntry.findByPk(
      Number(liveCallEntry.id_queue_call_entry)
    );
    if (callTag) alreadyTagged = true;

    const liveCallResult = [{
      id: liveCallEntry.id,
      language: queueCallEntry
        ? IVR_LANGUAGE_CODES[`${queueCallEntry['queue']}`] : '', // tslint:disable-line
      call_type: callEntry ? callEntry.call_type : '',
      caller_id: liveCallEntry.callerid,
      caller_name: previousCallDetail?.caller_name || '',
      call_tag_id: callTag?.id || null,
      call_entry_id: liveCallEntry.id_call_entry,
      datetime_init: liveCallEntry.datetime_init,
      already_tagged: alreadyTagged,
      total_calls_attended: totalCallsAttended,
      total_abandoned_calls: totalCallsAbandoned,
      call_reference_number: liveCallEntry.uniqueid,
      total_call_waiting_count: callEntryWaitingCount,
      call_duration_in_minutes: moment().diff(liveCallEntry.datetime_init, 'minutes'),
    }];
    return liveCallResult;
  }
  return [{
    total_calls_attended: totalCallsAttended,
    total_abandoned_calls: totalCallsAbandoned,
    total_call_waiting_count: callEntryWaitingCount
  }];
}

function getLiveCallByAgentId(userId) {
  return LiveCallEntry.findOne({
    where: { id_agent: userId },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
}

export { list, getLiveCallByAgentId };
