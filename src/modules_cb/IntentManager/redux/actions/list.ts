import {AppError} from "src/models/common";
import {IntentEntity} from "../../types";
import {ChatBot} from "../../../ChatBotManager/types";

export const GET_LIST_INTENT = "GET_LIST_INTENT";
export const GET_LIST_INTENT_SUCCESS = "GET_LIST_INTENT_SUCCESS";
export const GET_LIST_INTENT_ERROR = "GET_LIST_INTENT_ERROR";
export const GET_LIST_INTENT_SET_CHAT_BOT_SELECTED = "GET_LIST_INTENT_SET_CHAT_BOT_SELECTED";

export interface GetListIntentAction {
  type: string,
  params?: any,
  error?: AppError,
  total?: number,
  rows?: IntentEntity[],
  cb?: ChatBot
}

export const getListIntent = (params: any): GetListIntentAction => ({
  type: GET_LIST_INTENT,
  params
});

export const getListIntentSuccess = (rows: IntentEntity[], total: number): GetListIntentAction => ({
  type: GET_LIST_INTENT_SUCCESS,
  rows,
  total
});

export const getListIntentError = (error: AppError): GetListIntentAction => ({
  type: GET_LIST_INTENT_ERROR,
  error
});

export const setChatBotSelected = (cb: ChatBot): GetListIntentAction => ({
  type: GET_LIST_INTENT_SET_CHAT_BOT_SELECTED,
  cb,
})
