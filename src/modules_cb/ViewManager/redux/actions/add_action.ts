import {AddActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AddActionViewAction {
  type: string,
  request?: AddActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ADD_ACTION = "ADD_ACTION";
export const ADD_ACTION_SUCCESS = "ADD_ACTION_SUCCESS";
export const ADD_ACTION_ERROR = "ADD_ACTION_ERROR";

export const addAction = (request?: AddActionToViewRequest): AddActionViewAction => ({
  type: ADD_ACTION,
  request
});

export const addActionSuccess = (response?: ResponseBase2): AddActionViewAction => ({
  type: ADD_ACTION_SUCCESS,
  response
});

export const addActionError = (error?: AppError): AddActionViewAction => ({
  type: ADD_ACTION_ERROR,
  error
});
