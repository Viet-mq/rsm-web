import {DeleteRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteApiGroupAction {
  type: string,
  request?: DeleteRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_API_GROUP = "DELETE_API_GROUP";
export const DELETE_API_GROUP_SUCCESS = "DELETE_API_GROUP_SUCCESS";
export const DELETE_API_GROUP_ERROR = "DELETE_API_GROUP_ERROR";

export const deleteApiGroup = (request?: DeleteRoleGroupRequest): DeleteApiGroupAction => ({
  type: DELETE_API_GROUP,
  request
});

export const deleteApiGroupSuccess = (response?: ResponseBase2): DeleteApiGroupAction => ({
  type: DELETE_API_GROUP_SUCCESS,
  response
});

export const deleteApiGroupError = (error?: AppError): DeleteApiGroupAction => ({
  type: DELETE_API_GROUP_ERROR,
  error
});
