import { Op } from 'sequelize';
import { ManagerReportInstance, ManagerReportStatic } from '../../types';

export function isValidPayload(
  this: ManagerReportInstance,
  payload: object,
  next: (err?: string) => void
) {
  if (!Object.keys(payload).length) {
    return next('Report columns should be present');
  }
  next();
}
