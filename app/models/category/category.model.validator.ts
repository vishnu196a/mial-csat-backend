import { Op } from 'sequelize';

import { CategoryStatic, CategoryInstance } from '../../types';

export function isNameUnique(
  this: CategoryInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name) {
    const model = this.constructor as CategoryStatic;
    model
      .findOne({ where: { name: { [Op.like]: name } } })
      .then((result: unknown) => {
        if (result) {
          return next('Name should be unique!');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}
