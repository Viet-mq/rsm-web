import {AppError, ResponseBase2} from "src/models/common";
import {APIRequest} from "../../../types";

export interface AddAPIAction {
  type: string,
  request?: APIRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ADD_API = "ADD_API";
export const ADD_API_SUCCESS = "ADD_API_SUCCESS";
export const ADD_API_ERROR = "ADD_API_ERROR";

export const addAPI = (request?: APIRequest): AddAPIAction => ({
  type: ADD_API,
  request
});

export const addAPISuccess = (response?: ResponseBase2): AddAPIAction => ({
  type: ADD_API_SUCCESS,
  response
});

export const addAPIError = (error?: AppError): AddAPIAction => ({
  type: ADD_API_ERROR,
  error
});
