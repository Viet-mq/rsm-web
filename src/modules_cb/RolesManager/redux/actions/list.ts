import {RolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RolesListAction {
  type: string,
  params?: any,
  rows?: RolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_ROLES = "GET_LIST_ROLES";
export const GET_LIST_ROLES_SUCCESS = "GET_LIST_ROLES_SUCCESS";
export const GET_LIST_ROLES_ERROR = "GET_LIST_ROLES_ERROR";

export const getListRoles = (params: any): RolesListAction => ({
  type: GET_LIST_ROLES,
  params
});

export const getListRolesSuccess = (total: number, rows: RolesEntity[]): RolesListAction => ({
  type: GET_LIST_ROLES_SUCCESS,
  total,
  rows
});

export const getListRolesError = (error: AppError): RolesListAction => ({
  type: GET_LIST_ROLES_ERROR,
  error
});
