import {ApiEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchListApiAction {
  type: string,
  params?: any,
  rows?: ApiEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_API = "SEARCH_LIST_API";
export const SEARCH_LIST_API_SUCCESS = "SEARCH_LIST_API_SUCCESS";
export const SEARCH_LIST_API_ERROR = "SEARCH_LIST_API_ERROR";

export const searchListApi = (params?: any): SearchListApiAction => ({
  type: SEARCH_LIST_API,
  params
});

export const searchListApiSuccess = (rows?: ApiEntity[], total?: number,): SearchListApiAction => ({
  type: SEARCH_LIST_API_SUCCESS,
  rows,
  total
});

export const searchListApiError = (error?: AppError): SearchListApiAction => ({
  type: SEARCH_LIST_API_ERROR,
  error
});
