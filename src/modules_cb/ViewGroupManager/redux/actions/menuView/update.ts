import {AppError, ResponseBase2} from "src/models/common";
import {UpdateMenuFrontendRequest} from "../../../types";

export interface UpdateMenuFrontendAction {
  type: string,
  request?: UpdateMenuFrontendRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_MENU_FRONTEND = "UPDATE_MENU_FRONTEND";
export const UPDATE_MENU_FRONTEND_SUCCESS = "UPDATE_MENU_FRONTEND_SUCCESS";
export const UPDATE_MENU_FRONTEND_ERROR = "UPDATE_MENU_FRONTEND_ERROR";

export const updateMenuFrontEnd = (request: UpdateMenuFrontendRequest): UpdateMenuFrontendAction => ({
  type: UPDATE_MENU_FRONTEND,
  request
});

export const updateMenuFrontEndSuccess = (response?: ResponseBase2): UpdateMenuFrontendAction => ({
  type: UPDATE_MENU_FRONTEND_SUCCESS,
  response
});

export const updateMenuFrontEndError = (error?: AppError): UpdateMenuFrontendAction => ({
  type: UPDATE_MENU_FRONTEND_ERROR,
  error
});
