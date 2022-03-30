import {UpdateRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateRolesAction {
  type: string,
  request?: UpdateRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_ROLES = "UPDATE_ROLES";
export const UPDATE_ROLES_SUCCESS = "UPDATE_ROLES_SUCCESS";
export const UPDATE_ROLES_ERROR = "UPDATE_ROLES_ERROR";

export const updateRoles = (request: UpdateRolesRequest): UpdateRolesAction => ({
  type: UPDATE_ROLES,
  request
});

export const updateRolesSuccess = (response: ResponseBase2): UpdateRolesAction => ({
  type: UPDATE_ROLES_SUCCESS,
  response
});

export const updateRolesError = (error: AppError): UpdateRolesAction => ({
  type: UPDATE_ROLES_ERROR,
  error
});
