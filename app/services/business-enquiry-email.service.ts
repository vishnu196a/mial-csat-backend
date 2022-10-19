import { sendBusinessEnquiryEmail } from './mailer.service';
import { BusinessEnquiryEmail, CallEntry } from '../models';
import { UserInstance, AddBusinessEnquiryEmailParams } from '../types';

async function add(attrs: AddBusinessEnquiryEmailParams, currentUser: UserInstance) {
  const { call_entry_id: callEntryId } = attrs;

  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new Error('Call entry not found');

  const businessEnquiryEmail = await BusinessEnquiryEmail.create({
    ...attrs,
    email_id: JSON.stringify(attrs.email_id),
    created_by: currentUser.id,
    call_entry_id: Number(callEntry.id)
  });

  sendBusinessEnquiryEmail(attrs);
  return businessEnquiryEmail;
}

export { add };
