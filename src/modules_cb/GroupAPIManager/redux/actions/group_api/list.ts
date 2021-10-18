import {AppError} from "src/models/common";
import {GroupAPIEntity} from "../../../types";

export interface GetListGroupAPIAction {
  type: string,
  params?: any,
  total?: number,
  rows?: GroupAPIEntity[],
  error?: AppError
}

export const GET_LIST_GROUP_API = "GET_LIST_GROUP_API";
export const GET_LIST_GROUP_API_SUCCESS = "GET_LIST_GROUP_API_SUCCESS";
export const GET_LIST_GROUP_API_ERROR = "GET_LIST_GROUP_API_ERROR";

export const getListGroupAPI = (params: any): GetListGroupAPIAction => ({
  type: GET_LIST_GROUP_API,
  params
});

export const getListGroupAPISuccess = (total: number, rows: GroupAPIEntity[]): GetListGroupAPIAction => ({
  type: GET_LIST_GROUP_API_SUCCESS,
  total,
  rows
});

export const getListGroupAPIError = (error?: AppError): GetListGroupAPIAction => ({
  type: GET_LIST_GROUP_API_ERROR,
  error
});
