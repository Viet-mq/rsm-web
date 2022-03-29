import {ViewRolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface ViewRolesListAction {
  type: string,
  params?: any,
  rows?: ViewRolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_VIEW_ROLES = "GET_LIST_VIEW_ROLES";
export const GET_LIST_VIEW_ROLES_SUCCESS = "GET_LIST_VIEW_ROLES_SUCCESS";
export const GET_LIST_VIEW_ROLES_ERROR = "GET_LIST_VIEW_ROLES_ERROR";

export const getListViewRoles = (params: any): ViewRolesListAction => ({
  type: GET_LIST_VIEW_ROLES,
  params
});

export const getListViewRolesSuccess = (total: number, rows: ViewRolesEntity[]): ViewRolesListAction => ({
  type: GET_LIST_VIEW_ROLES_SUCCESS,
  total,
  rows
});

export const getListViewRolesError = (error: AppError): ViewRolesListAction => ({
  type: GET_LIST_VIEW_ROLES_ERROR,
  error
});
