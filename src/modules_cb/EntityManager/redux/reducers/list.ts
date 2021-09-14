import {ChatBotEntity} from "../services/apis";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {EntityListAction, EntityListParams} from "../actions";
import {ChatBot} from "../../../ChatBotManager/types";

export interface EntityListState {
  loading: boolean,
  params?: EntityListParams,
  rows?: ChatBotEntity[],
  total?: number,
  error?: AppError,
  chatBot?: ChatBot
}

const initState: EntityListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {
  type,
  params,
  rows,
  total,
  error,
  chatBot
}: EntityListAction): EntityListState => {
  switch (type) {

    case Actions.ENTITY_CHAT_BOT_GET_LIST:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS:
      return {
        ...state,
        loading: true
      };
    case Actions.ENTITY_CHAT_BOT_GET_LIST_SUCCESS:
      return {
        ...state,
        rows,
        total,
        loading: false
      }
    case Actions.ENTITY_CHAT_BOT_GET_LIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    case Actions.ENTITY_SET_CHAT_BOT_ID:
      return {
        ...state,
        chatBot: chatBot
      }
    default:
      return state;
  }
}
