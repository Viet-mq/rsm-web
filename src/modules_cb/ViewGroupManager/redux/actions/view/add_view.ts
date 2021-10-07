import {AppError, ResponseBase2} from "src/models/common";
import {ActionViewRequest} from "../../../types";

export interface AddActionViewAction {
  type: string,
  request?: ActionViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ADD_ACTION_VIEW = "ADD_ACTION_VIEW";
export const ADD_ACTION_VIEW_SUCCESS = "ADD_ACTION_VIEW_SUCCESS";
export const ADD_ACTION_VIEW_ERROR = "ADD_ACTION_VIEW_ERROR";

export const addActionView = (request?: ActionViewRequest): AddActionViewAction => ({
  type: ADD_ACTION_VIEW,
  request
});

export const addActionViewSuccess = (response?: ResponseBase2): AddActionViewAction => ({
  type: ADD_ACTION_VIEW_SUCCESS,
  response
});

export const addActionViewError = (error?: AppError): AddActionViewAction => ({
  type: ADD_ACTION_VIEW_ERROR,
  error
});
