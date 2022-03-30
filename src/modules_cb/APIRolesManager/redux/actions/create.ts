import {CreateAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateAPIRolesAction {
  type: string,
  request?: CreateAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_API_ROLES = "CREATE_API_ROLES";
export const CREATE_API_ROLES_SUCCESS = "CREATE_API_ROLES_SUCCESS";
export const CREATE_API_ROLES_ERROR = "CREATE_API_ROLES_ERROR";

export const createAPIRoles = (request: CreateAPIRolesRequest): CreateAPIRolesAction => ({
  type: CREATE_API_ROLES,
  request
});

export const createAPIRolesSuccess = (response: ResponseBase2): CreateAPIRolesAction => ({
  type: CREATE_API_ROLES_SUCCESS,
  response
});

export const createAPIRolesError = (error: AppError): CreateAPIRolesAction => ({
  type: CREATE_API_ROLES_ERROR,
  error
});
