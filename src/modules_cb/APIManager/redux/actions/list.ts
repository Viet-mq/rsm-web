import {ApiEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListApiAction {
  type: string,
  params?: any,
  rows?: ApiEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_API = "GET_LIST_API";
export const GET_LIST_API_SUCCESS = "GET_LIST_API_SUCCESS";
export const GET_LIST_API_ERROR = "GET_LIST_API_ERROR";

export const getListApi = (params?: any): GetListApiAction => ({
  type: GET_LIST_API,
  params
});

export const getListApiSuccess = (rows?: ApiEntity[], total?: number,): GetListApiAction => ({
  type: GET_LIST_API_SUCCESS,
  rows,
  total
});

export const getListApiError = (error?: AppError): GetListApiAction => ({
  type: GET_LIST_API_ERROR,
  error
});
