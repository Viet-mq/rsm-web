import {EmailEntity} from "../../types";
import {AppError} from "src/models/common";

export interface ListEmailAction {
  type: string,
  params?: any,
  rows?: EmailEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_EMAIL = "GET_LIST_EMAIL";
export const GET_LIST_EMAIL_SUCCESS = "GET_LIST_EMAIL_SUCCESS";
export const GET_LIST_EMAIL_ERROR = "GET_LIST_EMAIL_ERROR";

export const getListEmail = (params: any): ListEmailAction => ({
  type: GET_LIST_EMAIL,
  params
});

export const getListEmailSuccess = (total: number, rows: EmailEntity[]): ListEmailAction => ({
  type: GET_LIST_EMAIL_SUCCESS,
  total,
  rows
});

export const getListEmailError = (error: AppError): ListEmailAction => ({
  type: GET_LIST_EMAIL_ERROR,
  error
});
