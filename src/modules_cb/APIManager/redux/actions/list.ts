import {ApiRoleEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListApiRoleAction {
  type: string,
  params?: any,
  rows?: ApiRoleEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_API_ROLE = "GET_LIST_API_ROLE";
export const GET_LIST_API_ROLE_SUCCESS = "GET_LIST_API_ROLE_SUCCESS";
export const GET_LIST_API_ROLE_ERROR = "GET_LIST_API_ROLE_ERROR";

export const getListApiRole = (params?: any): GetListApiRoleAction => ({
  type: GET_LIST_API_ROLE,
  params
});

export const getListApiRoleSuccess = (rows?: ApiRoleEntity[], total?: number,): GetListApiRoleAction => ({
  type: GET_LIST_API_ROLE_SUCCESS,
  rows,
  total
});

export const getListApiRoleError = (error?: AppError): GetListApiRoleAction => ({
  type: GET_LIST_API_ROLE_ERROR,
  error
});
