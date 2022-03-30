import {UpdateViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateViewRolesAction {
  type: string,
  request?: UpdateViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_VIEW_ROLES = "UPDATE_VIEW_ROLES";
export const UPDATE_VIEW_ROLES_SUCCESS = "UPDATE_VIEW_ROLES_SUCCESS";
export const UPDATE_VIEW_ROLES_ERROR = "UPDATE_VIEW_ROLES_ERROR";

export const updateViewRoles = (request: UpdateViewRolesRequest): UpdateViewRolesAction => ({
  type: UPDATE_VIEW_ROLES,
  request
});

export const updateViewRolesSuccess = (response: ResponseBase2): UpdateViewRolesAction => ({
  type: UPDATE_VIEW_ROLES_SUCCESS,
  response
});

export const updateViewRolesError = (error: AppError): UpdateViewRolesAction => ({
  type: UPDATE_VIEW_ROLES_ERROR,
  error
});
