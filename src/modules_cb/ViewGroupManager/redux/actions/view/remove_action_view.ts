import {AppError, ResponseBase2} from "src/models/common";
import {ActionViewRequest} from "../../../types";

export interface RemoveActionViewAction {
  type: string,
  request?: ActionViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REMOVE_ACTION_VIEW = "REMOVE_ACTION_VIEW";
export const REMOVE_ACTION_VIEW_SUCCESS = "REMOVE_ACTION_VIEW_SUCCESS";
export const REMOVE_ACTION_VIEW_ERROR = "REMOVE_ACTION_VIEW_ERROR";

export const removeAction = (request?: ActionViewRequest): RemoveActionViewAction => ({
  type: REMOVE_ACTION_VIEW,
  request
});

export const removeActionSuccess = (response?: ResponseBase2): RemoveActionViewAction => ({
  type: REMOVE_ACTION_VIEW_SUCCESS,
  response
});

export const removeActionError = (error?: AppError): RemoveActionViewAction => ({
  type: REMOVE_ACTION_VIEW_ERROR,
  error
});
