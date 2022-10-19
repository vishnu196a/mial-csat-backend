import { UserInstance } from "./user";

export interface AddUserParams {
  name: string;
  email: string;
  role_id: number;
  mobile_no?: string;
  employee_number: string;
  agent_code: string;
}

export interface UserListQueryParams {
  q?: string;
  role?: string;
  page?: number;
  name?: string;
  email?: string;
  per_page?: number;
  mobile_no?: string;
  agent_code?: string;
  employee_number?: string;
}

export interface UserRowsAndCount {
  count: number;
  rows: UserInstance[];
}

export interface UserUpdateParams {
  name: string;
  mobile_no: string;
  employee_number: string;
  agent_code: string;
  role_id: bigint;
}