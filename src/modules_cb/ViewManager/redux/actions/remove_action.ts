import {AddActionToViewRequest, DeleteActionToViewRequest} from "src/modules_cb/ViewManager/types";
import {AppError, ResponseBase2} from "src/models/common";

export interface RemoveActionViewAction {
  type: string,
  request?: DeleteActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REMOVE_ACTION = "REMOVE_ACTION";
export const REMOVE_ACTION_SUCCESS = "REMOVE_ACTION_SUCCESS";
export const REMOVE_ACTION_ERROR = "REMOVE_ACTION_ERROR";

export const removeAction = (request?:DeleteActionToViewRequest): RemoveActionViewAction => ({
  type: REMOVE_ACTION,
  request
});

export const removeActionSuccess = (response?: ResponseBase2): RemoveActionViewAction => ({
  type: REMOVE_ACTION_SUCCESS,
  response
});

export const removeActionError = (error?: AppError): RemoveActionViewAction => ({
  type: REMOVE_ACTION_ERROR,
  error
});
