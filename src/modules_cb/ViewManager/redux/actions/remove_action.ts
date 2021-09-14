import {AddActionToViewRequest} from "src/modules_cb/ViewManager/types";
import {AppError, ResponseBase2} from "src/models/common";

export interface RemoveActionViewAction {
  type: string,
  request?: AddActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const FRONT_END_REMOVE_ACTION = "FRONT_END_REMOVE_ACTION";
export const FRONT_END_REMOVE_ACTION_SUCCESS = "FRONT_END_REMOVE_ACTION_SUCCESS";
export const FRONT_END_REMOVE_ACTION_ERROR = "FRONT_END_REMOVE_ACTION_ERROR";

export const removeAction = (request?: AddActionToViewRequest): RemoveActionViewAction => ({
  type: FRONT_END_REMOVE_ACTION,
  request
});

export const removeActionSuccess = (response?: ResponseBase2): RemoveActionViewAction => ({
  type: FRONT_END_REMOVE_ACTION_SUCCESS,
  response
});

export const removeActionError = (error?: AppError): RemoveActionViewAction => ({
  type: FRONT_END_REMOVE_ACTION_ERROR,
  error
});
