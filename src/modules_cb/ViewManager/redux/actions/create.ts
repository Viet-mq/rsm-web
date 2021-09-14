import {CreateFrontendViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateViewAction {
  type: string,
  request?: CreateFrontendViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_VIEW_FRONT_END = "CREATE_VIEW_FRONT_END";
export const CREATE_VIEW_FRONT_END_SUCCESS = "CREATE_VIEW_FRONT_END_SUCCESS";
export const CREATE_VIEW_FRONT_END_ERROR = "CREATE_VIEW_FRONT_END_ERROR";

export const createViewFrontEnd = (request: CreateFrontendViewRequest): CreateViewAction => ({
  type: CREATE_VIEW_FRONT_END,
  request
});

export const createViewFrontEndSuccess = (response?: ResponseBase2): CreateViewAction => ({
  type: CREATE_VIEW_FRONT_END_SUCCESS,
  response
});

export const createViewFrontEndError = (error?: AppError): CreateViewAction => ({
  type: CREATE_VIEW_FRONT_END_ERROR,
  error
});
