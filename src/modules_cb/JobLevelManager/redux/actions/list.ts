import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";

export interface JobLevelListAction {
  type: string,
  params?: any,
  rows?: JobLevelEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_JOB_LEVEL = "GET_LIST_JOB_LEVEL";
export const GET_LIST_JOB_LEVEL_SUCCESS = "GET_LIST_JOB_LEVEL_SUCCESS";
export const GET_LIST_JOB_LEVEL_ERROR = "GET_LIST_JOB_LEVEL_ERROR";

export const getListJobLevel = (params: any): JobLevelListAction => ({
  type: GET_LIST_JOB_LEVEL,
  params
});

export const getListJobLevelSuccess = (total: number, rows: JobLevelEntity[]): JobLevelListAction => ({
  type: GET_LIST_JOB_LEVEL_SUCCESS,
  total,
  rows
});

export const getListJobLevelError = (error: AppError): JobLevelListAction => ({
  type: GET_LIST_JOB_LEVEL_ERROR,
  error
});
