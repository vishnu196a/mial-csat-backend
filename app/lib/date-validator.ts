// tslint:disable:max-line-length
import moment from 'moment';

function validateDate(to: string, from: string) {
  if ((from && !to) || (!from && to)) throw new Error('From and To date must be present');

  if (from && to) {
    if (!(moment(from, 'YYYY-MM-DD HH:mm').isValid() && moment(to, 'YYYY-MM-DD HH:mm').isValid())) throw new Error('Invalid date');

    if (moment(from).isAfter(to, 'day')) throw new Error('From date should be less than To date');
  }
}

function validateDateTime(dateTime: Date, fieldName: string) {
  if (!(moment(dateTime, 'YYYY-MM-DD HH:mm').isValid())) throw new Error(`${fieldName} is invalid`);
}

export { validateDate, validateDateTime };
