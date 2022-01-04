import {AppError, ResponseBase2} from "src/models/common";
import {CreateChatBotReq} from "../../types";

export const CREATE_CHAT_BOT = 'CREATE_CHAT_BOT';
export const CREATE_CHAT_BOT_SUCCESS = 'CREATE_CHAT_BOT_SUCCESS';
export const CREATE_CHAT_BOT_ERROR = 'CREATE_CHAT_BOT_ERROR';

export interface CreateChatBotAction {
  type: string,
  params?: CreateChatBotReq,
  response?: ResponseBase2,
  error?: AppError
}

export const createChatBot = (params: any): CreateChatBotAction => ({
  type: CREATE_CHAT_BOT,
  params,
});

export const createChatBotSuccess = (payload: ResponseBase2): CreateChatBotAction => ({
  type: CREATE_CHAT_BOT_SUCCESS,
  response: payload
});

export const createChatBotError = (error: CreateChatBotAction['error']): CreateChatBotAction => ({
  type: CREATE_CHAT_BOT_ERROR,
  error,
});
