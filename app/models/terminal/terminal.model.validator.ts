import { Op } from 'sequelize';

import { TerminalStatic, TerminalInstance } from '../../types';

export function isNameUnique(
  this: TerminalInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name) {
    const model = this.constructor as TerminalStatic;
    model
      .findOne({ where: { name: { [Op.like]: name } } })
      .then((result: TerminalInstance | null) => {
        if (result) {
          return next('Name should be unique');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}
