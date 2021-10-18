import {AppError, ResponseBase2} from "src/models/common";
import {AssignUserRequest} from "../../../types";

export interface AssignUserAction {
  type: string,
  request?: AssignUserRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ASSIGN_USER = "ASSIGN_USER";
export const ASSIGN_USER_SUCCESS = "ASSIGN_USER_SUCCESS";
export const ASSIGN_USER_ERROR = "ASSIGN_USER_ERROR";

export const assignUser = (request?: AssignUserRequest): AssignUserAction => ({
  type: ASSIGN_USER,
  request
});

export const assignUserSuccess = (response?: ResponseBase2): AssignUserAction => ({
  type: ASSIGN_USER_SUCCESS,
  response
});

export const assignUserError = (error?: AppError): AssignUserAction => ({
  type: ASSIGN_USER_ERROR,
  error
});
