import {APIRolesEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchAPIRolesAction {
  type: string,
  params?: any,
  rows?: APIRolesEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_API_ROLES = "GET_SEARCH_API_ROLES";
export const GET_SEARCH_API_ROLES_SUCCESS = "GET_SEARCH_API_ROLES_SUCCESS";
export const GET_SEARCH_API_ROLES_ERROR = "GET_SEARCH_API_ROLES_ERROR";

export const getSearchAPIRoles = (params: any): SearchAPIRolesAction => ({
  type: GET_SEARCH_API_ROLES,
  params
});

export const getSearchAPIRolesSuccess = (total: number, rows: APIRolesEntity[]): SearchAPIRolesAction => ({
  type: GET_SEARCH_API_ROLES_SUCCESS,
  total,
  rows
});

export const getSearchAPIRolesError = (error: AppError): SearchAPIRolesAction => ({
  type: GET_SEARCH_API_ROLES_ERROR,
  error
});
