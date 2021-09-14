import {ListChatBotAction} from "./index";

export const GET_LIST_CHAT_BOT = 'GET_LIST_CHAT_BOT';
export const GET_LIST_CHAT_BOT_SUCCESS = 'GET_LIST_CHAT_BOT_SUCCESS';
export const GET_LIST_CHAT_BOT_ERROR = 'GET_LIST_CHAT_BOT_ERROR';

export const getListChatBots = (params: {
  page?: number;
  size?: number;
}): ListChatBotAction => ({
  type: GET_LIST_CHAT_BOT,
  params
})

export const getListChatBotsSuccess = (payload: ListChatBotAction['payload']): ListChatBotAction => ({
  type: GET_LIST_CHAT_BOT_SUCCESS,
  payload
});

export const getListChatBotsError = (error: ListChatBotAction['error']): ListChatBotAction => ({
  type: GET_LIST_CHAT_BOT_ERROR,
  error
})
