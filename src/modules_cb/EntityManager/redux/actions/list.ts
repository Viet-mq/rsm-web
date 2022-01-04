import {ChatBotEntity} from "../services/apis";
import {AppError} from "src/models/common";
import {ChatBot} from "../../../ChatBotManager/types";

export const ENTITY_CHAT_BOT_GET_LIST = "ENTITY_CHAT_BOT_GET_LIST";
export const ENTITY_CHAT_BOT_GET_LIST_SUCCESS = "ENTITY_CHAT_BOT_GET_LIST_SUCCESS";
export const ENTITY_CHAT_BOT_GET_LIST_ERROR = "ENTITY_CHAT_BOT_GET_LIST_ERROR";
export const ENTITY_SET_CHAT_BOT_ID = "ENTITY_SET_CHAT_BOT_ID";
export const ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS = "ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS";

export interface EntityListParams {
  chatbot_id?: string
  page?: number,
  size?: number
}

export interface EntityListAction {
  type: string,
  params?: EntityListParams,
  rows?: ChatBotEntity[],
  total?: number,
  error?: AppError,
  chatBot?: ChatBot
}

export const getListChatBotEntity = (params: EntityListParams): EntityListAction => ({
  type: ENTITY_CHAT_BOT_GET_LIST,
  params
});

export const getListChatBotEntityWithoutInParams = (): EntityListAction => ({
  type: ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS,
});

export const getListChatBotEntitySuccess = (rows?: ChatBotEntity[], total?: number): EntityListAction => ({
  type: ENTITY_CHAT_BOT_GET_LIST_SUCCESS,
  rows,
  total
});

export const getListChatBotEntityError = (error?: AppError): EntityListAction => ({
  type: ENTITY_CHAT_BOT_GET_LIST_ERROR,
  error
});

export const setChatBotId = (cb: ChatBot): EntityListAction => ({
  type: ENTITY_SET_CHAT_BOT_ID,
  chatBot: cb
});
