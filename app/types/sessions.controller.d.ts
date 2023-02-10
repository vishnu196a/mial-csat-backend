export interface LoginBodyParams {
  access_token: string;
  current_sign_in_at: Date;
  current_sign_in_ip: string;
  sign_in_count: number;
  last_sign_in_at: Date;
  last_sign_in_ip: string;
}

export interface JwtTokenUserAttributes {
  id: number;
  email: string;
}

export interface JwtTokenIVRAttributes {
  name: string;
}

export interface JwtTokenCRMAttributes {
  name: string;
}
