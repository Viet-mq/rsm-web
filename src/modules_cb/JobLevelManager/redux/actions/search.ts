import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchJobLevelAction {
  type: string,
  params?: any,
  rows?: JobLevelEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_JOB_LEVEL = "GET_SEARCH_JOB_LEVEL";
export const GET_SEARCH_JOB_LEVEL_SUCCESS = "GET_SEARCH_JOB_LEVEL_SUCCESS";
export const GET_SEARCH_JOB_LEVEL_ERROR = "GET_SEARCH_JOB_LEVEL_ERROR";

export const getSearchJobLevel = (params: any): SearchJobLevelAction => ({
  type: GET_SEARCH_JOB_LEVEL,
  params
});

export const getSearchJobLevelSuccess = (total: number, rows: JobLevelEntity[]): SearchJobLevelAction => ({
  type: GET_SEARCH_JOB_LEVEL_SUCCESS,
  total,
  rows
});

export const getSearchJobLevelError = (error: AppError): SearchJobLevelAction => ({
  type: GET_SEARCH_JOB_LEVEL_ERROR,
  error
});
