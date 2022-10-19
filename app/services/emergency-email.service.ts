import { sendEmergencyEmail } from './mailer.service';
import { EmergencyEmail, CallEntry } from '../models';
import { UserInstance, AddEmergencyEmailParams } from '../types';

async function add(attrs: AddEmergencyEmailParams, currentUser: UserInstance) {
  const { call_entry_id: callEntryId } = attrs;

  const callEntry = await CallEntry.findByPk(callEntryId);
  if (!callEntry) throw new Error('Call entry not found');

  const emergencyEmail = await EmergencyEmail.create({
    ...attrs,
    email_id: JSON.stringify(attrs.email_id),
    created_by: currentUser.id,
    call_entry_id: Number(callEntry.id)
  });

  sendEmergencyEmail(attrs);
  return emergencyEmail;
}

export { add };
