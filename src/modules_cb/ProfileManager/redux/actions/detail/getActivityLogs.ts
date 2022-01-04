import {ActivityLogsEntity} from "../../../types";
import {AppError} from "src/models/common";

export interface ActivityLogsAction {
  type: string,
  params?: any,
  rows?: ActivityLogsEntity[],
  total?: number,
  error?: AppError
}

export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_ACTIVITY_SUCCESS = "GET_ACTIVITY_SUCCESS";
export const GET_ACTIVITY_ERROR = "GET_ACTIVITY_ERROR";

export const getActivityLogs = (params: any): ActivityLogsAction => ({
  type: GET_ACTIVITY,
  params
});

export const getActivityLogsSuccess = (total: number, rows: ActivityLogsEntity[]): ActivityLogsAction => ({
  type: GET_ACTIVITY_SUCCESS,
  total,
  rows
});

export const getActivityLogsError = (error: AppError): ActivityLogsAction => ({
  type: GET_ACTIVITY_ERROR,
  error
});
