import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteViewAction {
  type: string,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_VIEW = "DELETE_VIEW";
export const DELETE_VIEW_SUCCESS = "DELETE_VIEW_SUCCESS";
export const DELETE_VIEW_ERROR = "DELETE_VIEW_ERROR";

export const deleteView = (id: string): DeleteViewAction => ({
  type: DELETE_VIEW,
  id
});

export const deleteViewSuccess = (response?: ResponseBase2): DeleteViewAction => ({
  type: DELETE_VIEW_SUCCESS,
  response
});

export const deleteViewError = (error?: AppError): DeleteViewAction => ({
  type: DELETE_VIEW_ERROR,
  error
});
