import {CreateApiRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateAPIAction {
  type: string,
  request?: CreateApiRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_API = "CREATE_API";
export const CREATE_API_SUCCESS = "CREATE_API_SUCCESS";
export const CREATE_API_ERROR = "CREATE_API_ERROR";

export const createApi = (request?: CreateApiRequest): CreateAPIAction => ({
  type: CREATE_API,
  request
});

export const createApiSuccess = (response?: ResponseBase2): CreateAPIAction => ({
  type: CREATE_API_SUCCESS,
  response
});

export const createApiError = (error?: AppError): CreateAPIAction => ({
  type: CREATE_API_ERROR,
  error
});
