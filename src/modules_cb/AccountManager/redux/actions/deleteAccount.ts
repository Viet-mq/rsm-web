import {DeleteAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteAccountAction {
  type: string,
  request?: DeleteAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_ERROR = "DELETE_ACCOUNT_ERROR";

export const deleteAccount = (request: DeleteAccountRequest): DeleteAccountAction => ({
  type: DELETE_ACCOUNT,
  request
});

export const deleteAccountSuccess = (response: ResponseBase2): DeleteAccountAction => ({
  type: DELETE_ACCOUNT_SUCCESS,
  response
});

export const deleteAccountError = (error: AppError): DeleteAccountAction => ({
  type: DELETE_ACCOUNT_ERROR,
  error
});
