import {ChangePasswordAccRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface ChangePasswordAction {
  type: string,
  request?: ChangePasswordAccRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CHANGE_PASSWORD_ACCOUNT = "CHANGE_PASSWORD_ACCOUNT";
export const CHANGE_PASSWORD_ACCOUNT_SUCCESS = "CHANGE_PASSWORD_ACCOUNT_SUCCESS";
export const CHANGE_PASSWORD_ACCOUNT_ERROR = "CHANGE_PASSWORD_ACCOUNT_ERROR";

export const changePassword = (request: ChangePasswordAccRequest): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_ACCOUNT,
  request
});

export const changePasswordSuccess = (response?: ResponseBase2): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_ACCOUNT_SUCCESS,
  response
});

export const changePasswordError = (error?: AppError): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_ACCOUNT_ERROR,
  error
});
