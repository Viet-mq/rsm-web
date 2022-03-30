import {UpdateAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateAPIRolesAction {
  type: string,
  request?: UpdateAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_API_ROLES = "UPDATE_API_ROLES";
export const UPDATE_API_ROLES_SUCCESS = "UPDATE_API_ROLES_SUCCESS";
export const UPDATE_API_ROLES_ERROR = "UPDATE_API_ROLES_ERROR";

export const updateAPIRoles = (request: UpdateAPIRolesRequest): UpdateAPIRolesAction => ({
  type: UPDATE_API_ROLES,
  request
});

export const updateAPIRolesSuccess = (response: ResponseBase2): UpdateAPIRolesAction => ({
  type: UPDATE_API_ROLES_SUCCESS,
  response
});

export const updateAPIRolesError = (error: AppError): UpdateAPIRolesAction => ({
  type: UPDATE_API_ROLES_ERROR,
  error
});
