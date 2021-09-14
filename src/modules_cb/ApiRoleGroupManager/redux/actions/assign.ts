import {AssignApiRoleRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AssignApiRoleAction {
  type: string,
  request?: AssignApiRoleRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ASSIGN_API_ROLE = "ASSIGN_API_ROLE";
export const ASSIGN_API_ROLE_SUCCESS = "ASSIGN_API_ROLE_SUCCESS";
export const ASSIGN_API_ROLE_ERROR = "ASSIGN_API_ROLE_ERROR";

export const assignApiGroup = (request?: AssignApiRoleRequest): AssignApiRoleAction => ({
  type: ASSIGN_API_ROLE,
  request
});

export const assignApiGroupSuccess = (response?: ResponseBase2): AssignApiRoleAction => ({
  type: ASSIGN_API_ROLE_SUCCESS,
  response
});

export const assignApiGroupError = (error?: AppError): AssignApiRoleAction => ({
  type: ASSIGN_API_ROLE_ERROR,
  error
});
