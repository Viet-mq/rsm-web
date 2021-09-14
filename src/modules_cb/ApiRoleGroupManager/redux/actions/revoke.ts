import {AppError, ResponseBase2} from "src/models/common";
import {RevokeApiRoleRequest} from "../../types";

export interface RevokeApiRoleAction {
  type: string,
  request?: RevokeApiRoleRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REVOKE_API_ROLE = "REVOKE_API_ROLE";
export const REVOKE_API_ROLE_SUCCESS = "REVOKE_API_ROLE_SUCCESS";
export const REVOKE_API_ROLE_ERROR = "REVOKE_API_ROLE_ERROR";

export const revokeApiRole = (request?: RevokeApiRoleRequest): RevokeApiRoleAction => ({
  type: REVOKE_API_ROLE,
  request
});

export const revokeApiRoleSuccess = (response?: ResponseBase2): RevokeApiRoleAction => ({
  type: REVOKE_API_ROLE_SUCCESS,
  response
});

export const revokeApiRoleError = (error?: AppError): RevokeApiRoleAction => ({
  type: REVOKE_API_ROLE_ERROR,
  error
});
