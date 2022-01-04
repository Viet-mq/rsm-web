import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {CreateChatBotAction} from "../actions";

export interface CreateChatBotState {
  params?: any;
  loading: boolean;
  error?: AppError;
  response?: ResponseBase2;
}

const initialState: CreateChatBotState = {
  loading: false,
  params: {},
};

export default (state = initialState, {type, response, error}: CreateChatBotAction): CreateChatBotState => {
  switch (type) {
    case Actions.CREATE_CHAT_BOT:
      return {
        ...state,
        response,
        error: undefined,
        loading: true,
      };
    case Actions.CREATE_CHAT_BOT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Actions.CREATE_CHAT_BOT_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
};
