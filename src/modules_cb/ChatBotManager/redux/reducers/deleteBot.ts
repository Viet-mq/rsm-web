import {AppError, ResponseBase2} from "src/models/common";
import {DeleteChatBotAction} from "../actions";
import * as Actions from '../actions';

export interface DeleteChatBotState {
  loading: boolean,
  params?: string,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteChatBotState = {
  loading: false,
  params: ''
}

export default (state = initState, {type, params, response, error}: DeleteChatBotAction): DeleteChatBotState => {
  switch (type) {
    case Actions.DELETE_CHAT_BOT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.DELETE_CHAT_BOT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_CHAT_BOT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
