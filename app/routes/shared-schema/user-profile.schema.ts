import { USER_ROLE } from '../../config/constants';

export const userProfile = {
  id: { type: 'number' },
  name: { type: 'string' },
  email: { type: 'string' },
  employee_number: { type: 'string' },
  agent_code: { type: 'string' },
  sign_in_count: { type: 'number' },
  last_sign_in_at: { type: 'string' },
  current_sign_in_at: { type: 'string' },
  confirmed_at: { type: 'string' },
  role: {
    type: 'string',
    enum: [Object.values(USER_ROLE)]
  }
};
