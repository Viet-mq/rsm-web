import {AppError, ResponseBase2} from "src/models/common";
import {RevokeUserRequest} from "../../../types";

export interface RevokeUserAction {
  type: string,
  request?: RevokeUserRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REVOKE_USER = "REVOKE_USER";
export const REVOKE_USER_SUCCESS = "REVOKE_USER_SUCCESS";
export const REVOKE_USER_ERROR = "REVOKE_USER_ERROR";

export const revokeUser = (request?: RevokeUserRequest): RevokeUserAction => ({
  type: REVOKE_USER,
  request
});

export const revokeUserSuccess = (response?: ResponseBase2): RevokeUserAction => ({
  type: REVOKE_USER_SUCCESS,
  response
});

export const revokeUserError = (error?: AppError): RevokeUserAction => ({
  type: REVOKE_USER_ERROR,
  error
});
