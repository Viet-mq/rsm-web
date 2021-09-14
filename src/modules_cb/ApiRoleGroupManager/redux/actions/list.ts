import {ApiRoleGroupEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListApiGroupAction {
  type: string,
  params?: any,
  rows?: ApiRoleGroupEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_API_GROUP_ACTION = "GET_LIST_API_GROUP_ACTION";
export const GET_LIST_API_GROUP_ACTION_SUCCESS = "GET_LIST_API_GROUP_ACTION_SUCCESS";
export const GET_LIST_API_GROUP_ACTION_ERROR = "GET_LIST_API_GROUP_ACTION_ERROR";

export const getListApiGroup = (params?: any): GetListApiGroupAction => ({
  type: GET_LIST_API_GROUP_ACTION,
  params
});

export const getListApiGroupSuccess = (rows?: ApiRoleGroupEntity[], total?: number): GetListApiGroupAction => ({
  type: GET_LIST_API_GROUP_ACTION_SUCCESS,
  rows,
  total
});

export const getListApiGroupError = (error?: AppError): GetListApiGroupAction => ({
  type: GET_LIST_API_GROUP_ACTION_ERROR,
  error
});
