import {DeleteAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteAPIRolesAction {
  type: string,
  request?: DeleteAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_API_ROLES = "DELETE_API_ROLES";
export const DELETE_API_ROLES_SUCCESS = "DELETE_API_ROLES_SUCCESS";
export const DELETE_API_ROLES_ERROR = "DELETE_API_ROLES_ERROR";

export const deleteAPIRoles = (request: DeleteAPIRolesRequest): DeleteAPIRolesAction => ({
  type: DELETE_API_ROLES,
  request
});

export const deleteAPIRolesSuccess = (response: ResponseBase2): DeleteAPIRolesAction => ({
  type: DELETE_API_ROLES_SUCCESS,
  response
});

export const deleteAPIRolesError = (error: AppError): DeleteAPIRolesAction => ({
  type: DELETE_API_ROLES_ERROR,
  error
});
