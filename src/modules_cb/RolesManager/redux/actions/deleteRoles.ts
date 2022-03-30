import {DeleteRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteRolesAction {
  type: string,
  request?: DeleteRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_ROLES = "DELETE_ROLES";
export const DELETE_ROLES_SUCCESS = "DELETE_ROLES_SUCCESS";
export const DELETE_ROLES_ERROR = "DELETE_ROLES_ERROR";

export const deleteRoles = (request: DeleteRolesRequest): DeleteRolesAction => ({
  type: DELETE_ROLES,
  request
});

export const deleteRolesSuccess = (response: ResponseBase2): DeleteRolesAction => ({
  type: DELETE_ROLES_SUCCESS,
  response
});

export const deleteRolesError = (error: AppError): DeleteRolesAction => ({
  type: DELETE_ROLES_ERROR,
  error
});
