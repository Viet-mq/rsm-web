import {UserAccount} from "../../types";
import {AppError} from "src/models/common";

export interface AccountListAction {
  type: string,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

export const GET_LIST_ACCOUNT = "GET_LIST_ACCOUNT";
export const GET_LIST_ACCOUNT_SUCCESS = "GET_LIST_ACCOUNT_SUCCESS";
export const GET_LIST_ACCOUNT_ERROR = "GET_LIST_ACCOUNT_ERROR";

export const getListAccount = (params: any): AccountListAction => ({
  type: GET_LIST_ACCOUNT,
  params
});

export const getListAccountSuccess = (total: number, rows: UserAccount[]): AccountListAction => ({
  type: GET_LIST_ACCOUNT_SUCCESS,
  total,
  rows
});

export const getListAccountError = (error: AppError): AccountListAction => ({
  type: GET_LIST_ACCOUNT_ERROR,
  error
});
