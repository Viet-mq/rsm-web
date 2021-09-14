import {AddActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AddActionViewAction {
  type: string,
  request?: AddActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const FRONT_END_ADD_ACTION = "FRONT_END_ADD_ACTION";
export const FRONT_END_ADD_ACTION_SUCCESS = "FRONT_END_ADD_ACTION_SUCCESS";
export const FRONT_END_ADD_ACTION_ERROR = "FRONT_END_ADD_ACTION_ERROR";

export const addAction = (request?: AddActionToViewRequest): AddActionViewAction => ({
  type: FRONT_END_ADD_ACTION,
  request
});

export const addActionSuccess = (response?: ResponseBase2): AddActionViewAction => ({
  type: FRONT_END_ADD_ACTION_SUCCESS,
  response
});

export const addActionError = (error?: AppError): AddActionViewAction => ({
  type: FRONT_END_ADD_ACTION_ERROR,
  error
});
