import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchListViewAction {
  type: string,
  params?: any,
  total?: number,
  rows?: ViewEntity[],
  error?: AppError
}

export const SEARCH_LIST_VIEW = "SEARCH_LIST_VIEW";
export const SEARCH_LIST_VIEW_SUCCESS = "SEARCH_LIST_VIEW_SUCCESS";
export const SEARCH_LIST_VIEW_ERROR = "SEARCH_LIST_VIEW_ERROR";

export const searchListView = (params: any): SearchListViewAction => ({
  type: SEARCH_LIST_VIEW,
  params
});

export const searchListViewSuccess = (total: number, rows: ViewEntity[]): SearchListViewAction => ({
  type: SEARCH_LIST_VIEW_SUCCESS,
  total,
  rows
});

export const searchListViewError = (error?: AppError): SearchListViewAction => ({
  type: SEARCH_LIST_VIEW_ERROR,
  error
});
