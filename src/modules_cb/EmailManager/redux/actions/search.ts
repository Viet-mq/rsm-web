import {EmailEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchEmailAction {
  type: string,
  params?: any,
  rows?: EmailEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_EMAIL = "SEARCH_LIST_EMAIL";
export const SEARCH_LIST_EMAIL_SUCCESS = "SEARCH_LIST_EMAIL_SUCCESS";
export const SEARCH_LIST_EMAIL_ERROR = "SEARCH_LIST_EMAIL_ERROR";

export const searchListEmail = (params: any): SearchEmailAction => ({
  type: SEARCH_LIST_EMAIL,
  params
});

export const searchListEmailSuccess = (total: number, rows: EmailEntity[]): SearchEmailAction => ({
  type: SEARCH_LIST_EMAIL_SUCCESS,
  total,
  rows
});

export const searchListEmailError = (error: AppError): SearchEmailAction => ({
  type: SEARCH_LIST_EMAIL_ERROR,
  error
});
