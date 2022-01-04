import {AppError} from "../../../../models/common";
import {IntentEntity} from "../../types";
import * as Actions from "../actions";
import {GetListIntentAction} from "../actions";
import {ChatBot} from "../../../ChatBotManager/types";

export interface ListIntentState {
  loading: boolean,
  params?: any,
  error?: AppError,
  total?: number,
  rows?: IntentEntity[],
  cb?: ChatBot
}

const initState: ListIntentState = {
  loading: false,
  total: 0,
  rows: [],
  params: {}
}

export default (state = initState, {type, params, rows, total, error, cb}: GetListIntentAction): ListIntentState => {
  switch (type) {
    case Actions.GET_LIST_INTENT:
      return {
        ...state,
        params: params,
        loading: true
      }
    case Actions.GET_LIST_INTENT_SUCCESS:
      return {
        ...state,
        rows,
        total,
        loading: false
      }
    case Actions.GET_LIST_INTENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    case Actions.GET_LIST_INTENT_SET_CHAT_BOT_SELECTED:
      return {
        ...state,
        cb,
      }
    default:
      return state;
  }
}
