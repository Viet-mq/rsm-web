import {UpdateActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateActionViewAction {
  type: string,
  request?: UpdateActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_ACTION = "UPDATE_ACTION";
export const UPDATE_ACTION_SUCCESS = "UPDATE_ACTION_SUCCESS";
export const UPDATE_ACTION_ERROR = "UPDATE_ACTION_ERROR";

export const updateAction = (request?: UpdateActionToViewRequest): UpdateActionViewAction => ({
  type: UPDATE_ACTION,
  request
});

export const updateActionSuccess = (response?: ResponseBase2): UpdateActionViewAction => ({
  type: UPDATE_ACTION_SUCCESS,
  response
});

export const updateActionError = (error?: AppError): UpdateActionViewAction => ({
  type: UPDATE_ACTION_ERROR,
  error
});
