import {CreateContentReq} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateContentAction {
  type: string,
  params?: CreateContentReq,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_CB_CONTENT = "CREATE_CB_CONTENT";
export const CREATE_CB_CONTENT_SUCCESS = "CREATE_CB_CONTENT_SUCCESS";
export const CREATE_CB_CONTENT_ERROR = "CREATE_CB_CONTENT_ERROR";

export const createChatBotContent = (params: CreateContentReq): CreateContentAction => ({
  type: CREATE_CB_CONTENT,
  params
});

export const createChatBotContentSuccess = (response: ResponseBase2): CreateContentAction => ({
  type: CREATE_CB_CONTENT_SUCCESS,
  response
});

export const createChatBotContentError = (error: AppError): CreateContentAction => ({
  type: CREATE_CB_CONTENT_ERROR,
  error
});
