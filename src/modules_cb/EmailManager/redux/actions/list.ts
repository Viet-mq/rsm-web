import {JobEntity} from "../../types";
import {AppError} from "src/models/common";

export interface JobListAction {
  type: string,
  params?: any,
  rows?: JobEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_JOB = "GET_LIST_JOB";
export const GET_LIST_JOB_SUCCESS = "GET_LIST_JOB_SUCCESS";
export const GET_LIST_JOB_ERROR = "GET_LIST_JOB_ERROR";

export const getListJob = (params: any): JobListAction => ({
  type: GET_LIST_JOB,
  params
});

export const getListJobSuccess = (total: number, rows: JobEntity[]): JobListAction => ({
  type: GET_LIST_JOB_SUCCESS,
  total,
  rows
});

export const getListJobError = (error: AppError): JobListAction => ({
  type: GET_LIST_JOB_ERROR,
  error
});
