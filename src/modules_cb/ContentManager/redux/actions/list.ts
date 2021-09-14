import {ChatBotContent} from "../../types";
import {AppError} from "src/models/common";

export interface ListContentAction {
  type: string,
  params?: any,
  total?: number,
  rows?: ChatBotContent[],
  error?: AppError
}

export const GET_CB_CONTENT = "GET_CB_CONTENT";
export const GET_CB_CONTENT_SUCCESS = "GET_CB_CONTENT_SUCCESS";
export const GET_CB_CONTENT_ERROR = "GET_CB_CONTENT_ERROR";

export const getListContent = (params: any): ListContentAction => ({
  type: GET_CB_CONTENT,
  params
});

export const getListContentSuccess = (total: number, rows: ChatBotContent[]): ListContentAction => ({
  type: GET_CB_CONTENT_SUCCESS,
  total,
  rows
});

export const getListContentError = (error: AppError): ListContentAction => ({
  type: GET_CB_CONTENT_ERROR,
  error
});
