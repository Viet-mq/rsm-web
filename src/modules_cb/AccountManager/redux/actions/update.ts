import {UpdateAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateAccountAction {
  type: string,
  request?: UpdateAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_ERROR = "UPDATE_ACCOUNT_ERROR";

export const updateAccount = (request: UpdateAccountRequest): UpdateAccountAction => ({
  type: UPDATE_ACCOUNT,
  request
});

export const updateAccountSuccess = (response: ResponseBase2): UpdateAccountAction => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  response
});

export const updateAccountError = (error: AppError): UpdateAccountAction => ({
  type: UPDATE_ACCOUNT_ERROR,
  error
});
