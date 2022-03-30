import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListViewAction {
  type: string,
  params?: any,
  total?: number,
  rows?: ViewEntity[],
  error?: AppError
}

export const GET_LIST_VIEW = "GET_LIST_VIEW";
export const GET_LIST_VIEW_SUCCESS = "GET_LIST_VIEW_SUCCESS";
export const GET_LIST_VIEW_ERROR = "GET_LIST_VIEW_ERROR";

export const getListView = (params: any): GetListViewAction => ({
  type: GET_LIST_VIEW,
  params
});

export const getListViewSuccess = (total: number, rows: ViewEntity[]): GetListViewAction => ({
  type: GET_LIST_VIEW_SUCCESS,
  total,
  rows
});

export const getListViewError = (error?: AppError): GetListViewAction => ({
  type: GET_LIST_VIEW_ERROR,
  error
});
