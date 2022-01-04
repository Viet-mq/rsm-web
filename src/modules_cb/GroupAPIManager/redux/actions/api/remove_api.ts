import {AppError, ResponseBase2} from "src/models/common";
import {APIRequest} from "../../../types";

export interface RemoveAPIAction {
  type: string,
  request?: APIRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REMOVE_API = "REMOVE_API";
export const REMOVE_API_SUCCESS = "REMOVE_API_SUCCESS";
export const REMOVE_API_ERROR = "REMOVE_API_ERROR";

export const removeAPI = (request?: APIRequest): RemoveAPIAction => ({
  type: REMOVE_API,
  request
});

export const removeAPISuccess = (response?: ResponseBase2): RemoveAPIAction => ({
  type: REMOVE_API_SUCCESS,
  response
});

export const removeAPIError = (error?: AppError): RemoveAPIAction => ({
  type: REMOVE_API_ERROR,
  error
});
