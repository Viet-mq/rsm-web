import {AppError, ResponseBase2} from "src/models/common";
import {UpdateGroupAPIRequest} from "../../../types";

export interface UpdateGroupAPIAction {
  type: string,
  request?: UpdateGroupAPIRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_GROUP_API = "UPDATE_GROUP_API";
export const UPDATE_GROUP_API_SUCCESS = "UPDATE_GROUP_API_SUCCESS";
export const UPDATE_GROUP_API_ERROR = "UPDATE_GROUP_API_ERROR";

export const updateGroupAPI = (request: UpdateGroupAPIRequest): UpdateGroupAPIAction => ({
  type: UPDATE_GROUP_API,
  request
});

export const updateGroupAPISuccess = (response?: ResponseBase2): UpdateGroupAPIAction => ({
  type: UPDATE_GROUP_API_SUCCESS,
  response
});

export const updateGroupAPIError = (error?: AppError): UpdateGroupAPIAction => ({
  type: UPDATE_GROUP_API_ERROR,
  error
});
