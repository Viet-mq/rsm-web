import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SourceCVListAction {
  type: string,
  params?: any,
  rows?: SourceCVEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_SOURCECV = "GET_LIST_SOURCECV";
export const GET_LIST_SOURCECV_SUCCESS = "GET_LIST_SOURCECV_SUCCESS";
export const GET_LIST_SOURCECV_ERROR = "GET_LIST_SOURCECV_ERROR";

export const getListSourceCV = (params: any): SourceCVListAction => ({
  type: GET_LIST_SOURCECV,
  params
});

export const getListSourceCVSuccess = (total: number, rows: SourceCVEntity[]): SourceCVListAction => ({
  type: GET_LIST_SOURCECV_SUCCESS,
  total,
  rows
});

export const getListSourceCVError = (error: AppError): SourceCVListAction => ({
  type: GET_LIST_SOURCECV_ERROR,
  error
});
