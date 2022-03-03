import {UserAccount} from "../../types";
import {AppError} from "src/models/common";

export interface SearchAccountAction {
  type: string,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_ACCOUNT = "GET_SEARCH_ACCOUNT";
export const GET_SEARCH_ACCOUNT_SUCCESS = "GET_SEARCH_ACCOUNT_SUCCESS";
export const GET_SEARCH_ACCOUNT_ERROR = "GET_SEARCH_ACCOUNT_ERROR";

export const getSearchAccount = (params: any): SearchAccountAction => ({
  type: GET_SEARCH_ACCOUNT,
  params
});

export const getSearchAccountSuccess = (total: number, rows: UserAccount[]): SearchAccountAction => ({
  type: GET_SEARCH_ACCOUNT_SUCCESS,
  total,
  rows
});

export const getSearchAccountError = (error: AppError): SearchAccountAction => ({
  type: GET_SEARCH_ACCOUNT_ERROR,
  error
});
