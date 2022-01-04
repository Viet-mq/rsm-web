import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";

export interface JobLevelListAction {
  type: string,
  params?: any,
  rows?: JobLevelEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_JOBLEVEL = "GET_LIST_JOBLEVEL";
export const GET_LIST_JOBLEVEL_SUCCESS = "GET_LIST_JOBLEVEL_SUCCESS";
export const GET_LIST_JOBLEVEL_ERROR = "GET_LIST_JOBLEVEL_ERROR";

export const getListJobLevel = (params: any): JobLevelListAction => ({
  type: GET_LIST_JOBLEVEL,
  params
});

export const getListJobLevelSuccess = (total: number, rows: JobLevelEntity[]): JobLevelListAction => ({
  type: GET_LIST_JOBLEVEL_SUCCESS,
  total,
  rows
});

export const getListJobLevelError = (error: AppError): JobLevelListAction => ({
  type: GET_LIST_JOBLEVEL_ERROR,
  error
});
