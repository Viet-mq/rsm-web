import {CreateViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateViewAction {
  type: string,
  request?: CreateViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_VIEW = "UPDATE_VIEW";
export const UPDATE_VIEW_SUCCESS = "UPDATE_VIEW_SUCCESS";
export const UPDATE_VIEW_ERROR = "UPDATE_VIEW_ERROR";

export const updateView = (request: CreateViewRequest): UpdateViewAction => ({
  type: UPDATE_VIEW,
  request
});

export const updateViewSuccess = (response?: ResponseBase2): UpdateViewAction => ({
  type: UPDATE_VIEW_SUCCESS,
  response
});

export const updateViewError = (error?: AppError): UpdateViewAction => ({
  type: UPDATE_VIEW_ERROR,
  error
});
