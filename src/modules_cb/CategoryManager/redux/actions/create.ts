import {CreateAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateAccountAction {
  type: string,
  request?: CreateAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
export const CREATE_ACCOUNT_ERROR = "CREATE_ACCOUNT_ERROR";

export const createAccount = (request: CreateAccountRequest): CreateAccountAction => ({
  type: CREATE_ACCOUNT,
  request
});

export const createAccountSuccess = (response: ResponseBase2): CreateAccountAction => ({
  type: CREATE_ACCOUNT_SUCCESS,
  response
});

export const createAccountError = (error: AppError): CreateAccountAction => ({
  type: CREATE_ACCOUNT_ERROR,
  error
});
