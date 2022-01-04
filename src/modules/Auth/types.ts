import {ResponseBase} from '../../models/common';

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse extends ResponseBase {
  access_token: string;
  permission: string[];
  is_manager: boolean | number;
  is_admin: boolean | number;
  is_hr: boolean | number;
  is_create_for_other: boolean | number;
  department_names: string[];
  username: string;
  permissions: string[];
  roles: string[];
  role: number;
}

export interface LoginResponse2 {
  code: number,
  message: string;
  access_token: string;
  fullName: string;
  username: string;
  permission: string[],

  //
  role: number,
  is_admin: number,
  is_create_for_other: number
}
