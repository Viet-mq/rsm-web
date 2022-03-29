import {APIRolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface APIRolesListAction {
  type: string,
  params?: any,
  rows?: APIRolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_API_ROLES = "GET_LIST_API_ROLES";
export const GET_LIST_API_ROLES_SUCCESS = "GET_LIST_API_ROLES_SUCCESS";
export const GET_LIST_API_ROLES_ERROR = "GET_LIST_API_ROLES_ERROR";

export const getListAPIRoles = (params: any): APIRolesListAction => ({
  type: GET_LIST_API_ROLES,
  params
});

export const getListAPIRolesSuccess = (total: number, rows: APIRolesEntity[]): APIRolesListAction => ({
  type: GET_LIST_API_ROLES_SUCCESS,
  total,
  rows
});

export const getListAPIRolesError = (error: AppError): APIRolesListAction => ({
  type: GET_LIST_API_ROLES_ERROR,
  error
});
