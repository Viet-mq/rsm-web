import {RolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchRolesAction {
  type: string,
  params?: any,
  rows?: RolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_ROLES = "GET_SEARCH_ROLES";
export const GET_SEARCH_ROLES_SUCCESS = "GET_SEARCH_ROLES_SUCCESS";
export const GET_SEARCH_ROLES_ERROR = "GET_SEARCH_ROLES_ERROR";

export const getSearchRoles = (params: any): SearchRolesAction => ({
  type: GET_SEARCH_ROLES,
  params
});

export const getSearchRolesSuccess = (total: number, rows: RolesEntity[]): SearchRolesAction => ({
  type: GET_SEARCH_ROLES_SUCCESS,
  total,
  rows
});

export const getSearchRolesError = (error: AppError): SearchRolesAction => ({
  type: GET_SEARCH_ROLES_ERROR,
  error
});
