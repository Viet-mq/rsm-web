import {ViewRolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchViewRolesAction {
  type: string,
  params?: any,
  rows?: ViewRolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_VIEW_ROLES = "GET_SEARCH_VIEW_ROLES";
export const GET_SEARCH_VIEW_ROLES_SUCCESS = "GET_SEARCH_VIEW_ROLES_SUCCESS";
export const GET_SEARCH_VIEW_ROLES_ERROR = "GET_SEARCH_VIEW_ROLES_ERROR";

export const getSearchViewRoles = (params: any): SearchViewRolesAction => ({
  type: GET_SEARCH_VIEW_ROLES,
  params
});

export const getSearchViewRolesSuccess = (total: number, rows: ViewRolesEntity[]): SearchViewRolesAction => ({
  type: GET_SEARCH_VIEW_ROLES_SUCCESS,
  total,
  rows
});

export const getSearchViewRolesError = (error: AppError): SearchViewRolesAction => ({
  type: GET_SEARCH_VIEW_ROLES_ERROR,
  error
});
