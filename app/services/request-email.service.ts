import { RequestEmail, CallEntry } from '../models';
import { UserInstance, AddRequestEmailParams } from '../types';
import { sendRequestEmail } from './mailer.service';

async function add(attrs: AddRequestEmailParams, currentUser: UserInstance) {
  const { call_entry_id: callEntryId } = attrs;

  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new Error('Call entry not found');

  const requestEmail = await RequestEmail.create({
    ...attrs,
    contact_person_email_id: JSON.stringify(attrs.contact_person_email_id),
    created_by: currentUser.id,
    call_entry_id: Number(callEntry.id)
  });

  sendRequestEmail(attrs);
  return requestEmail;
}

export { add };
