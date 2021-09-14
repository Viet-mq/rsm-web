import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteViewAction {
  type: string,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_VIEW_FRONT_END = "DELETE_VIEW_FRONT_END";
export const DELETE_VIEW_FRONT_END_SUCCESS = "DELETE_VIEW_FRONT_END_SUCCESS";
export const DELETE_VIEW_FRONT_END_ERROR = "DELETE_VIEW_FRONT_END_ERROR";

export const deleteView = (id: string): DeleteViewAction => ({
  type: DELETE_VIEW_FRONT_END,
  id
});

export const createDeleteViewSuccess = (response?: ResponseBase2): DeleteViewAction => ({
  type: DELETE_VIEW_FRONT_END_SUCCESS,
  response
});

export const createDeleteViewError = (error?: AppError): DeleteViewAction => ({
  type: DELETE_VIEW_FRONT_END_ERROR,
  error
});
