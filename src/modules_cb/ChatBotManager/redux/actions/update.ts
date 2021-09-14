import {UpdateChatBotReq} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export const UPDATE_CHAT_BOT = "UPDATE_CHAT_BOT";
export const UPDATE_CHAT_BOT_SUCCESS = "UPDATE_CHAT_BOT_SUCCESS";
export const UPDATE_CHAT_BOT_ERROR = "UPDATE_CHAT_BOT_ERROR";

export interface UpdateChatBotAction {
  type: string,
  params?: UpdateChatBotReq,
  response?: ResponseBase2,
  error?: AppError
}

export const updateChatBot = (params: UpdateChatBotReq): UpdateChatBotAction => ({
  type: UPDATE_CHAT_BOT,
  params
});

export const updateChatBotSuccess = (response: ResponseBase2): UpdateChatBotAction => ({
  type: UPDATE_CHAT_BOT_SUCCESS,
  response
});

export const updateChatBotError = (error: AppError): UpdateChatBotAction => ({
  type: UPDATE_CHAT_BOT_ERROR,
  error
});
