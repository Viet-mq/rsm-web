import {DeleteApiRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteAPIAction {
  type: string,
  request?: DeleteApiRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_API = "DELETE_API";
export const DELETE_API_SUCCESS = "DELETE_API_SUCCESS";
export const DELETE_API_ERROR = "DELETE_API_ERROR";

export const deleteApi = (request?: DeleteApiRequest): DeleteAPIAction => ({
  type: DELETE_API,
  request
});

export const deleteApiSuccess = (response?: ResponseBase2): DeleteAPIAction => ({
  type: DELETE_API_SUCCESS,
  response
});

export const deleteApiError = (error?: AppError): DeleteAPIAction => ({
  type: DELETE_API_ERROR,
  error
});
