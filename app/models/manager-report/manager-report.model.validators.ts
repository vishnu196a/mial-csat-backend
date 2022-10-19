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

export function isHandlerNameUnique(
  this: ManagerReportInstance,
  handlerName: string,
  next: (err?: string) => void
) {
  if (handlerName) {
    const model = this.constructor as ManagerReportStatic;
    model
      .findOne({ where: { handler_name: { [Op.like]: handlerName } } })
      .then((result: ManagerReportInstance | null) => {
        if (result) {
          return next('handler_name already exists');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}

export function isNameUnique(
  this: ManagerReportInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name) {
    const model = this.constructor as ManagerReportStatic;
    model
      .findOne({ where: { name: { [Op.like]: name } } })
      .then((result: ManagerReportInstance | null) => {
        if (result) {
          return next('name already exists');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}
