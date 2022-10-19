import { Op } from 'sequelize';

import { ContactInstance, ContactStatic } from '../../types';

import {
  MOBILE_NUMBER_VALIDATION_REGX,
  LANDLINE_NUMBER_VALIDATION_REGX
} from '../../config/constants';

export function isValidPhoneNumber(
  this: ContactInstance,
  phone: string,
  next: (err?: string) => string
) {
  if (phone && this.sub_category_id) {
    if (!MOBILE_NUMBER_VALIDATION_REGX.test(phone)) {
      return next('Invalid Mobile Number');
    }
    const model = this.constructor as ContactStatic;
    model
      .findOne({
        where: { phone: { [Op.like]: phone }, sub_category_id: this.sub_category_id },
      })
      .then((result: ContactInstance | null) => {
        if (result) {
          return next('Phone number already exists');
        }
        return next();
      })
      .catch(() => next());
  }
}

export function isMobileNumberPresent(
  this: ContactInstance,
) {
  if (!(this.landline_number || this.phone)) {
    throw new Error('Phone or Landline Number should be present');
  }
}

export function isValidLandLineNumber(
  this: ContactInstance,
  landline_number: string,
  next: (err?: string) => string
) {
  if (landline_number && this.sub_category_id) {
    if (!LANDLINE_NUMBER_VALIDATION_REGX.test(landline_number)) {
      return next('Invalid Landline Number');
    }
    const model = this.constructor as ContactStatic;
    model
      .findOne({
        where: {
          landline_number: { [Op.like]: landline_number },
          sub_category_id: this.sub_category_id
        },
      })
      .then((result: ContactInstance | null) => {
        if (result) {
          return next('Landline Number already exists');
        }
        return next();
      })
      .catch(() => next());
  }
}

export function isEmailUnique(
  this: ContactInstance,
  email: string,
  next: (err?: string) => void
) {
  if (email && this.sub_category_id) {
    const model = this.constructor as ContactStatic;
    model
      .findOne({
        where: { email: { [Op.like]: email }, sub_category_id: this.sub_category_id },
      })
      .then((result: ContactInstance | null) => {
        if (result) {
          return next('Email already exists');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next('Email should be present');
  }
}

export function isNameUnique(
  this: ContactInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name && this.sub_category_id) {
    const model = this.constructor as ContactStatic;
    model
      .findOne({
        where: { name: { [Op.like]: name }, sub_category_id: this.sub_category_id },
      })
      .then((result: unknown) => {
        if (result) {
          return next('Name should be unique');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next('Name should be unique');
  }
}
