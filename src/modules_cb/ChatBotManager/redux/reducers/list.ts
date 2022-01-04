import * as Actions from "../actions";
import {ListChatBotAction} from "../actions";
import {AppError} from "src/models/common";
import {ChatBot} from "../../types";

export interface GetListChatBotState {
  params?: any;
  loading: boolean;
  error?: AppError;
  rows: ChatBot[];
  total?: number;
}

const initState: GetListChatBotState = {
  loading: false,
  rows: [],
  total: 0
}

export default (state = initState, {type, params, payload, error}: ListChatBotAction): GetListChatBotState => {
  switch (type) {
    case Actions.GET_LIST_CHAT_BOT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_CHAT_BOT_SUCCESS:
      return {
        ...state,
        rows: payload?.rows || [],
        total: payload?.total || 0,
        loading: false
      }
    case Actions.GET_LIST_CHAT_BOT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
