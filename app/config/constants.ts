export const SALT_ROUND = 10;

export const USER_ROLE = {
  admin: 'Admin',
  agent: 'Agent'
};

export const Q_MINIMUM_SIZE = 3;

export const EMAIL_VALIDATION_REGX =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const MOBILE_NUMBER_VALIDATION_REGX =
/^(\+\d{1,3}[- ]?)?\d{10}$/;

export const SURVEY_FORM_INVITATAION_STATUS = {
  sent: 'Sent',
  responded: 'Responded'
};
