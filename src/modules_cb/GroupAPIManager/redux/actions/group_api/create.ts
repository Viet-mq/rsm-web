import {AppError, ResponseBase2} from "src/models/common";
import {CreateGroupAPIRequest} from "../../../types";

export interface CreateGroupAPIAction {
  type: string,
  request?: CreateGroupAPIRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_GROUP_API = "CREATE_GROUP_API";
export const CREATE_GROUP_API_SUCCESS = "CREATE_GROUP_API_SUCCESS";
export const CREATE_GROUP_API_ERROR = "CREATE_GROUP_API_ERROR";

export const createGroupAPI = (request: CreateGroupAPIRequest): CreateGroupAPIAction => ({
  type: CREATE_GROUP_API,
  request
});

export const createGroupAPISuccess = (response?: ResponseBase2): CreateGroupAPIAction => ({
  type: CREATE_GROUP_API_SUCCESS,
  response
});

export const createGroupAPIError = (error?: AppError): CreateGroupAPIAction => ({
  type: CREATE_GROUP_API_ERROR,
  error
});
