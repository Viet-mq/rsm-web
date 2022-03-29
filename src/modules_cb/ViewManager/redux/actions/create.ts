import {CreateViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateViewAction {
  type: string,
  request?: CreateViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_VIEW = "CREATE_VIEW";
export const CREATE_VIEW_SUCCESS = "CREATE_VIEW_SUCCESS";
export const CREATE_VIEW_ERROR = "CREATE_VIEW_ERROR";

export const createView = (request: CreateViewRequest): CreateViewAction => ({
  type: CREATE_VIEW,
  request
});

export const createViewSuccess = (response?: ResponseBase2): CreateViewAction => ({
  type: CREATE_VIEW_SUCCESS,
  response
});

export const createViewError = (error?: AppError): CreateViewAction => ({
  type: CREATE_VIEW_ERROR,
  error
});
