import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchSourceCVAction {
  type: string,
  params?: any,
  rows?: SourceCVEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_SOURCE_CV = "GET_SEARCH_SOURCE_CV";
export const GET_SEARCH_SOURCE_CV_SUCCESS = "GET_SEARCH_SOURCE_CV_SUCCESS";
export const GET_SEARCH_SOURCE_CV_ERROR = "GET_SEARCH_SOURCE_CV_ERROR";

export const getSearchSourceCV = (params: any): SearchSourceCVAction => ({
  type: GET_SEARCH_SOURCE_CV,
  params
});

export const getSearchSourceCVSuccess = (total: number, rows: SourceCVEntity[]): SearchSourceCVAction => ({
  type: GET_SEARCH_SOURCE_CV_SUCCESS,
  total,
  rows
});

export const getSearchSourceCVError = (error: AppError): SearchSourceCVAction => ({
  type: GET_SEARCH_SOURCE_CV_ERROR,
  error
});
