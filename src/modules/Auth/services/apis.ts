import {LoginInput, LoginResponse2} from '../types';
import {POST} from 'src/services';
import {ResponseBase2} from "src/models/common";

export const login = (data?: LoginInput): Promise<LoginResponse2> => {
  debugger
  return POST('acc-svc/users/auth/login', data);
};

export const changePassword = async (data?: any): Promise<any> => {
  return (await POST('acc-svc/account/change-password-self', data)) as ResponseBase2;
};

