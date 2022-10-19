import { Category } from '../../models';
import { CallTagInstance } from '../../types';
import { EMERGENCY_CATEGORY_NAME } from '../../config/constants';

export async function checkCategory(
  this: CallTagInstance,
  next: (err?: string) => string
) {
  const category = await Category.findByPk(Number(this.category_id));
  if (category && (category.name === EMERGENCY_CATEGORY_NAME)) {
    if (!this.terminal_id) {
      return next('Terminal should be present');
    }
    if (!this.caller_name) {
      return next('Caller name should be present');
    }
    if (!this.contact_number) {
      return next('Contact number should be present');
    }
  }
  next();
}
