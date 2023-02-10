export interface AddUserParams {
  name: string;
  email: string;
  role_id: number;
  mobile_no?: string;
  employee_number: string;
  agent_code: string;
  password: string;
  password_confirmation: string;
  confirmed_at: Date;
}

export interface UserUpdateParams {
  name: string;
  mobile_no: string;
  employee_number: string;
  agent_code: string;
  role_id: bigint;
}