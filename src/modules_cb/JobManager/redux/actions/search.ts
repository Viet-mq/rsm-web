import {JobEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchJobAction {
  type: string,
  params?: any,
  rows?: JobEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_JOB = "GET_SEARCH_JOB";
export const GET_SEARCH_JOB_SUCCESS = "GET_SEARCH_JOB_SUCCESS";
export const GET_SEARCH_JOB_ERROR = "GET_SEARCH_JOB_ERROR";

export const getSearchJob = (params: any): SearchJobAction => ({
  type: GET_SEARCH_JOB,
  params
});

export const getSearchJobSuccess = (total: number, rows: JobEntity[]): SearchJobAction => ({
  type: GET_SEARCH_JOB_SUCCESS,
  total,
  rows
});

export const getSearchJobError = (error: AppError): SearchJobAction => ({
  type: GET_SEARCH_JOB_ERROR,
  error
});
