import {CreateEntityRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {CreateEntityAction} from "../actions";

export interface CreateChatBotEntityModuleState {
  loading: boolean,
  params?: CreateEntityRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateChatBotEntityModuleState = {
  loading: false,
}

export default (state = initState, {
  type,
  params,
  response,
  error
}: CreateEntityAction): CreateChatBotEntityModuleState => {
  switch (type) {
    case Actions.CREATE_CHAT_BOT_ENTITY:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.CREATE_CHAT_BOT_ENTITY_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_CHAT_BOT_ENTITY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
