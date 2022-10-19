import { Op } from 'sequelize';

import {
  UserStatic,
  UserInstance
} from '../../types';

export function isEmailUnique(
  this: UserInstance,
  email: string,
  next: (err?: string) => void
) {
  if (email) {
    const model = this.constructor as UserStatic;
    model
      .findOne({ where: { email: { [Op.like]: email } } })
      .then((result: UserInstance | null) => {
        if (result) {
          return next('Email already exist');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}

export function isValidPassword(
  this: UserInstance,
  password: string,
  next: (err?: string) => void
) {
  if (password) {
    if (password !== this.password_confirmation) {
      return next("Password confirmation doesn't match password");
    }
  }
  next();
}

export function isEmployeeNumberUnique(
  this: UserInstance,
  employeeNumber: string,
  next: (err?: string) => void
) {
  if (employeeNumber) {
    const model = this.constructor as UserStatic;
    model
      .findOne({ where: { employee_number : { [Op.like]: employeeNumber } } })
      .then((result: UserInstance | null) => {
        if (result) {
          return next('Employee Number already exist');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}

export function isAgentCodeUnique(
  this: UserInstance,
  agentCode: string,
  next: (err?: string) => void
) {
  if (agentCode) {
    const model = this.constructor as UserStatic;
    model
      .findOne({ where: { agent_code : { [Op.like]: agentCode } } })
      .then((result: UserInstance | null) => {
        if (result) {
          return next('Agent Code already exist');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}
