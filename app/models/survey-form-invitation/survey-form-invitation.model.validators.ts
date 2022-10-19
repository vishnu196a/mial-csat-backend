import { SurveyFormInvitationInstance } from '../../types';

import {
  EMAIL_VALIDATION_REGX,
  MOBILE_NUMBER_VALIDATION_REGX
} from '../../config/constants';

export function isValidContact(
  this: SurveyFormInvitationInstance,
  contact: string,
  next: (err?: string) => void
) {
  if (this.type === 'Email') {
    if (!(EMAIL_VALIDATION_REGX.test(contact))) {
      return next('Invalid Email');
    }
    return next();
  }
  if (this.type === 'SMS') {
    if (!MOBILE_NUMBER_VALIDATION_REGX.test(contact)) {
      return next('Invalid Mobile Number');
    }
    return next();
  }
}
