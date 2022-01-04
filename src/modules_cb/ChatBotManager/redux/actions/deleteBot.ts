import {AppError, ResponseBase2} from "src/models/common";

export const DELETE_CHAT_BOT = "DELETE_CHAT_BOT"
export const DELETE_CHAT_BOT_SUCCESS = "DELETE_CHAT_BOT_SUCCESS"
export const DELETE_CHAT_BOT_ERROR = "DELETE_CHAT_BOT_ERROR"

export interface DeleteChatBotAction {
  type: string,
  params?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const deleteChatBot = (params: string): DeleteChatBotAction => ({
  type: DELETE_CHAT_BOT,
  params
});

export const deleteChatBotSuccess = (response: ResponseBase2): DeleteChatBotAction => ({
  type: DELETE_CHAT_BOT_SUCCESS,
  response
});

export const deleteChatBotError = (error: AppError): DeleteChatBotAction => ({
  type: DELETE_CHAT_BOT_ERROR,
  error
});
