import { sendFeedbackEmail } from './mailer.service';
import { FeedbackEmail, CallEntry } from '../models';
import { UserInstance, AddFeedbackEmailParams } from '../types';

async function add(attrs: AddFeedbackEmailParams, currentUser: UserInstance) {
  const { call_entry_id: callEntryId } = attrs;

  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new Error('Call entry not found');

  const feedbackEmail = await FeedbackEmail.create({
    ...attrs,
    email_id: JSON.stringify(attrs.email_id),
    created_by: currentUser.id,
    call_entry_id: Number(callEntry.id)
  });

  sendFeedbackEmail(attrs);
  return feedbackEmail;
}

export { add };
