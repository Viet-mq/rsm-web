import {MenuFrontendEntity} from "../../../types";
import {AppError} from "src/models/common";

export interface GetListMenuFrontendAction {
  type: string,
  params?: any,
  total?: number,
  rows?: MenuFrontendEntity[],
  error?: AppError
}

export const GET_LIST_MENU_FRONTEND = "GET_LIST_MENU_FRONTEND";
export const GET_LIST_MENU_FRONTEND_SUCCESS = "GET_LIST_MENU_FRONTEND_SUCCESS";
export const GET_LIST_MENU_FRONTEND_ERROR = "GET_LIST_MENU_FRONTEND_ERROR";

export const getListMenuFrontend = (params: any): GetListMenuFrontendAction => ({
  type: GET_LIST_MENU_FRONTEND,
  params
});

export const getListMenuFrontendSuccess = (total: number, rows: MenuFrontendEntity[]): GetListMenuFrontendAction => ({
  type: GET_LIST_MENU_FRONTEND_SUCCESS,
  total,
  rows
});

export const getListMenuFrontendError = (error?: AppError): GetListMenuFrontendAction => ({
  type: GET_LIST_MENU_FRONTEND_ERROR,
  error
});
