import {UpdateChatBotReq} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateChatBotAction} from "../actions";

export interface UpdateChatBotState {
  loading: boolean,
  params?: UpdateChatBotReq,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateChatBotState = {
  loading: false
}

// 1. current state, 1. action
export default (state = initState, {type, params, response, error}: UpdateChatBotAction): UpdateChatBotState => {

  switch (type) {
    case Actions.UPDATE_CHAT_BOT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.UPDATE_CHAT_BOT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_CHAT_BOT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
