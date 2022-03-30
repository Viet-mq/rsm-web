import {UpdateApiRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateAPIAction {
  type: string,
  request?: UpdateApiRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_API = "UPDATE_API";
export const UPDATE_API_SUCCESS = "UPDATE_API_SUCCESS";
export const UPDATE_API_ERROR = "UPDATE_API_ERROR";

export const updateApi = (request?: UpdateApiRequest): UpdateAPIAction => ({
  type: UPDATE_API,
  request
});

export const updateApiSuccess = (response?: ResponseBase2): UpdateAPIAction => ({
  type: UPDATE_API_SUCCESS,
  response
});

export const updateApiError = (error?: AppError): UpdateAPIAction => ({
  type: UPDATE_API_ERROR,
  error
});
