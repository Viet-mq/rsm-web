import {EmailLogsEntity} from "../../../types";
import {AppError} from "src/models/common";

export interface EmailLogsAction {
  type: string,
  params?: any,
  rows?: EmailLogsEntity[],
  total?: number,
  error?: AppError
}

export const GET_EMAIL_LOGS = "GET_EMAIL_LOGS";
export const GET_EMAIL_LOGS_SUCCESS = "GET_EMAIL_LOGS_SUCCESS";
export const GET_EMAIL_LOGS_ERROR = "GET_EMAIL_LOGS_ERROR";

export const getEmailLogs = (params: any): EmailLogsAction => ({
  type: GET_EMAIL_LOGS,
  params
});

export const getEmailLogsSuccess = (total: number, rows: EmailLogsEntity[]): EmailLogsAction => ({
  type: GET_EMAIL_LOGS_SUCCESS,
  total,
  rows
});

export const getEmailLogsError = (error: AppError): EmailLogsAction => ({
  type: GET_EMAIL_LOGS_ERROR,
  error
});
