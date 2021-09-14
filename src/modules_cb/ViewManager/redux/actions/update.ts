import {CreateFrontendViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateViewAction {
  type: string,
  request?: CreateFrontendViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_VIEW_FRONT_END = "UPDATE_VIEW_FRONT_END";
export const UPDATE_VIEW_FRONT_END_SUCCESS = "UPDATE_VIEW_FRONT_END_SUCCESS";
export const UPDATE_VIEW_FRONT_END_ERROR = "UPDATE_VIEW_FRONT_END_ERROR";

export const updateViewFrontEnd = (request: CreateFrontendViewRequest): UpdateViewAction => ({
  type: UPDATE_VIEW_FRONT_END,
  request
});

export const updateViewFrontEndSuccess = (response?: ResponseBase2): UpdateViewAction => ({
  type: UPDATE_VIEW_FRONT_END_SUCCESS,
  response
});

export const updateViewFrontEndError = (error?: AppError): UpdateViewAction => ({
  type: UPDATE_VIEW_FRONT_END_ERROR,
  error
});
