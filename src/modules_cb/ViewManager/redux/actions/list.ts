import {FrontendViewEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListFrontendViewAction {
  type: string,
  params?: any,
  total?: number,
  rows?: FrontendViewEntity[],
  error?: AppError
}

export const GET_LIST_FRONT_END_VIEW = "GET_LIST_FRONT_END_VIEW";
export const GET_LIST_FRONT_END_VIEW_SUCCESS = "GET_LIST_FRONT_END_VIEW_SUCCESS";
export const GET_LIST_FRONT_END_VIEW_ERROR = "GET_LIST_FRONT_END_VIEW_ERROR";

export const getListFrontendView = (params: any): GetListFrontendViewAction => ({
  type: GET_LIST_FRONT_END_VIEW,
  params
});

export const getListFrontendViewSuccess = (total: number, rows: FrontendViewEntity[]): GetListFrontendViewAction => ({
  type: GET_LIST_FRONT_END_VIEW_SUCCESS,
  total,
  rows
});

export const getListFrontendViewError = (error?: AppError): GetListFrontendViewAction => ({
  type: GET_LIST_FRONT_END_VIEW_ERROR,
  error
});
