import { map } from 'lodash';

import { paginate, paginatorResult } from '../lib/paginator-result';
import { CallEntryInstance, UserInstance } from '../types';
import { IVR_LANGUAGE_CODES, Q_MINIMUM_SIZE } from '../config/constants';
import { CallEntry, CallTag, QueueCallEntry } from '../models';
import { getACalltag } from './call-tag.service';

async function filterAndPaginate(query, user: UserInstance) {
  const userId = Number(user.id);
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage =
    Number(query.per_page) && query.per_page > 0 ? Number(query.per_page) : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;

  const untagedCallEtries = await CallEntry.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: CallTag,
        as: 'call_tags'
      },
      {
        model: QueueCallEntry,
        as: 'queue_call_entry'
      }
    ],
    where: {
      id_agent: userId,
      '$call_tags.id$': null,
      status: 'terminada'
    },
    order: [['datetime_end', 'DESC']]
  });

  const untagedCallEtriesList = map(
    untagedCallEtries.rows,
    async (rows: CallEntryInstance) => {
      const previousCallDetail = await getACalltag({
        limit: 1,
        order: [['created_at', 'DESC']],
        where: { contact_number: rows.callerid }
      });

      const data = {
        call_entry_id: rows.id,
        language: rows.queue_call_entry
          ? IVR_LANGUAGE_CODES[rows.queue_call_entry.queue]
          : '',
        caller_id: rows.callerid,
        caller_name: previousCallDetail ? previousCallDetail.caller_name : '',
        call_tag_id: rows.call_tags?.id || null,
        id_agent: rows.id_agent,
        datetime_init: rows.datetime_init,
        already_tagged: false,
        call_reference_number: rows.uniqueid
      };
      return data;
    }
  );
  const callTagData = await Promise.all(untagedCallEtriesList);
  const rowsAndCounts = {
    count: untagedCallEtries.count,
    rows: callTagData
  };

  const result = paginate(rowsAndCounts, perPage, page);
  return paginatorResult(result, 'untaged_call_entries');
}

export { filterAndPaginate };
