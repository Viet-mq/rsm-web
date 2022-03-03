import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SourceCVListAction {
  type: string,
  params?: any,
  rows?: SourceCVEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_SOURCE_CV = "GET_LIST_SOURCE_CV";
export const GET_LIST_SOURCE_CV_SUCCESS = "GET_LIST_SOURCE_CV_SUCCESS";
export const GET_LIST_SOURCE_CV_ERROR = "GET_LIST_SOURCE_CV_ERROR";

export const getListSourceCV = (params: any): SourceCVListAction => ({
  type: GET_LIST_SOURCE_CV,
  params
});

export const getListSourceCVSuccess = (total: number, rows: SourceCVEntity[]): SourceCVListAction => ({
  type: GET_LIST_SOURCE_CV_SUCCESS,
  total,
  rows
});

export const getListSourceCVError = (error: AppError): SourceCVListAction => ({
  type: GET_LIST_SOURCE_CV_ERROR,
  error
});
