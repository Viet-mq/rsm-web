import {AppError} from "src/models/common";
import {UserAccount} from "../../../AccountManager/types";

export interface SearchUserAction {
  type: string,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR";

export const searchUser = (params: any): SearchUserAction => ({
  type: SEARCH_USER,
  params
});

export const searchUserSuccess = (total: number, rows: UserAccount[]): SearchUserAction => ({
  type: SEARCH_USER_SUCCESS,
  total,
  rows
});

export const searchUserError = (error: AppError): SearchUserAction => ({
  type: SEARCH_USER_ERROR,
  error
});
