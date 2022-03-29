import {DeleteViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteViewRolesAction {
  type: string,
  request?: DeleteViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_VIEW_ROLES = "DELETE_VIEW_ROLES";
export const DELETE_VIEW_ROLES_SUCCESS = "DELETE_VIEW_ROLES_SUCCESS";
export const DELETE_VIEW_ROLES_ERROR = "DELETE_VIEW_ROLES_ERROR";

export const deleteViewRoles = (request: DeleteViewRolesRequest): DeleteViewRolesAction => ({
  type: DELETE_VIEW_ROLES,
  request
});

export const deleteViewRolesSuccess = (response: ResponseBase2): DeleteViewRolesAction => ({
  type: DELETE_VIEW_ROLES_SUCCESS,
  response
});

export const deleteViewRolesError = (error: AppError): DeleteViewRolesAction => ({
  type: DELETE_VIEW_ROLES_ERROR,
  error
});
