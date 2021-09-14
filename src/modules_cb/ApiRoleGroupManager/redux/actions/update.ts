import {UpdateRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateApiGroupAction {
  type: string,
  request?: UpdateRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_API_GROUP = "UPDATE_API_GROUP";
export const UPDATE_API_GROUP_SUCCESS = "UPDATE_API_GROUP_SUCCESS";
export const UPDATE_API_GROUP_ERROR = "UPDATE_API_GROUP_ERROR";

export const updateApiGroup = (request?: UpdateRoleGroupRequest): UpdateApiGroupAction => ({
  type: UPDATE_API_GROUP,
  request
});

export const updateApiGroupSuccess = (response?: ResponseBase2): UpdateApiGroupAction => ({
  type: UPDATE_API_GROUP_SUCCESS,
  response
});

export const updateApiGroupError = (error?: AppError): UpdateApiGroupAction => ({
  type: UPDATE_API_GROUP_ERROR,
  error
});
