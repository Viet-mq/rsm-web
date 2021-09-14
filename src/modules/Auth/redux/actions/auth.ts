import {LoginInput, LoginResponse2} from '../../types';
import {ActionBase, AppError} from '../../../../models/common';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export interface LoginAction extends ActionBase<LoginInput> {
}

export const login = (payload: LoginInput): LoginAction => ({
  type: LOGIN,
  payload,
});

export interface LoginSuccessAction extends ActionBase<LoginResponse2> {
}

export const loginSuccess = (payload: LoginResponse2): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export interface LoginErrorAction extends ActionBase<LoginResponse2> {
}

export const loginError = (error: AppError): LoginErrorAction => ({
  type: LOGIN_ERROR,
  error,
});

export interface LogoutAction extends ActionBase<{}> {
}

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
