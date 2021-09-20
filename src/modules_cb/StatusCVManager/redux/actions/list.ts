import {StatusCVEntity} from "../../types";
import {AppError} from "src/models/common";

export interface StatusCVListAction {
  type: string,
  params?: any,
  rows?: StatusCVEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_STATUSCV = "GET_LIST_STATUSCV";
export const GET_LIST_STATUSCV_SUCCESS = "GET_LIST_STATUSCV_SUCCESS";
export const GET_LIST_STATUSCV_ERROR = "GET_LIST_STATUSCV_ERROR";

export const getListStatusCV = (params: any): StatusCVListAction => ({
  type: GET_LIST_STATUSCV,
  params
});

export const getListStatusCVSuccess = (total: number, rows: StatusCVEntity[]): StatusCVListAction => ({
  type: GET_LIST_STATUSCV_SUCCESS,
  total,
  rows
});

export const getListStatusCVError = (error: AppError): StatusCVListAction => ({
  type: GET_LIST_STATUSCV_ERROR,
  error
});
