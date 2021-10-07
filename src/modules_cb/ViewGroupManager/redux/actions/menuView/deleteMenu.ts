import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteMenuFrontendAction {
  type: string,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_MENU_FRONTEND = "DELETE_MENU_FRONTEND";
export const DELETE_MENU_FRONTEND_SUCCESS = "DELETE_MENU_FRONTEND_SUCCESS";
export const DELETE_MENU_FRONTEND_ERROR = "DELETE_MENU_FRONTEND_ERROR";

export const deleteMenuFrontend = (id: string): DeleteMenuFrontendAction => ({
  type: DELETE_MENU_FRONTEND,
  id
});

export const deleteMenuFrontendSuccess = (response?: ResponseBase2): DeleteMenuFrontendAction => ({
  type: DELETE_MENU_FRONTEND_SUCCESS,
  response
});

export const deleteMenuFrontendError = (error?: AppError): DeleteMenuFrontendAction => ({
  type: DELETE_MENU_FRONTEND_ERROR,
  error
});
