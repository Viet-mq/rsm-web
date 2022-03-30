import {CreateViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateViewRolesAction {
  type: string,
  request?: CreateViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_VIEW_ROLES = "CREATE_VIEW_ROLES";
export const CREATE_VIEW_ROLES_SUCCESS = "CREATE_VIEW_ROLES_SUCCESS";
export const CREATE_VIEW_ROLES_ERROR = "CREATE_VIEW_ROLES_ERROR";

export const createViewRoles = (request: CreateViewRolesRequest): CreateViewRolesAction => ({
  type: CREATE_VIEW_ROLES,
  request
});

export const createViewRolesSuccess = (response: ResponseBase2): CreateViewRolesAction => ({
  type: CREATE_VIEW_ROLES_SUCCESS,
  response
});

export const createViewRolesError = (error: AppError): CreateViewRolesAction => ({
  type: CREATE_VIEW_ROLES_ERROR,
  error
});
