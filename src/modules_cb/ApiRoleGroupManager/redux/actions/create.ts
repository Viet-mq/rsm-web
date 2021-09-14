import {CreateRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateApiGroupAction {
  type: string,
  request?: CreateRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_API_GROUP = "CREATE_API_GROUP";
export const CREATE_API_GROUP_SUCCESS = "CREATE_API_GROUP_SUCCESS";
export const CREATE_API_GROUP_ERROR = "CREATE_API_GROUP_ERROR";

export const createApiGroup = (request?: CreateRoleGroupRequest): CreateApiGroupAction => ({
  type: CREATE_API_GROUP,
  request
});

export const createApiGroupSuccess = (response?: ResponseBase2): CreateApiGroupAction => ({
  type: CREATE_API_GROUP_SUCCESS,
  response
});

export const createApiGroupError = (error?: AppError): CreateApiGroupAction => ({
  type: CREATE_API_GROUP_ERROR,
  error
});
