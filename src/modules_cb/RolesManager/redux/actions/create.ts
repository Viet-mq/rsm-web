import {CreateRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateRolesAction {
  type: string,
  request?: CreateRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_ROLES = "CREATE_ROLES";
export const CREATE_ROLES_SUCCESS = "CREATE_ROLES_SUCCESS";
export const CREATE_ROLES_ERROR = "CREATE_ROLES_ERROR";

export const createRoles = (request: CreateRolesRequest): CreateRolesAction => ({
  type: CREATE_ROLES,
  request
});

export const createRolesSuccess = (response: ResponseBase2): CreateRolesAction => ({
  type: CREATE_ROLES_SUCCESS,
  response
});

export const createRolesError = (error: AppError): CreateRolesAction => ({
  type: CREATE_ROLES_ERROR,
  error
});
