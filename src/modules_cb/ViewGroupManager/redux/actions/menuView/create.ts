import { CreateMenuFrontendRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateMenuFrontendAction {
  type: string,
  request?: CreateMenuFrontendRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_MENU_FRONTEND = "CREATE_MENU_FRONTEND";
export const CREATE_MENU_FRONTEND_SUCCESS = "CREATE_MENU_FRONTEND_SUCCESS";
export const CREATE_MENU_FRONTEND_ERROR = "CREATE_MENU_FRONTEND_ERROR";

export const createMenuFrontEnd = (request: CreateMenuFrontendRequest): CreateMenuFrontendAction => ({
  type: CREATE_MENU_FRONTEND,
  request
});

export const createMenuFrontEndSuccess = (response?: ResponseBase2): CreateMenuFrontendAction => ({
  type: CREATE_MENU_FRONTEND_SUCCESS,
  response
});

export const createMenuFrontEndError = (error?: AppError): CreateMenuFrontendAction => ({
  type: CREATE_MENU_FRONTEND_ERROR,
  error
});
