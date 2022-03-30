import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetDetailViewAction {
  type: string,
  params?: any,
  total?: number,
  rows?: ViewEntity[]|any,
  error?: AppError
}

export const GET_DETAIL_VIEW = "GET_DETAIL_VIEW";
export const GET_DETAIL_VIEW_SUCCESS = "GET_DETAIL_VIEW_SUCCESS";
export const GET_DETAIL_VIEW_ERROR = "GET_DETAIL_VIEW_ERROR";

export const getDetailView = (params: any): GetDetailViewAction => ({
  type: GET_DETAIL_VIEW,
  params
});

export const getDetailViewSuccess = (total: number, rows: ViewEntity[]): GetDetailViewAction => ({
  type: GET_DETAIL_VIEW_SUCCESS,
  total,
  rows
});

export const getDetailViewError = (error?: AppError): GetDetailViewAction => ({
  type: GET_DETAIL_VIEW_ERROR,
  error
});
