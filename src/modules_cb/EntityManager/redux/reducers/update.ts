import {UpdateEntityRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateEntityAction} from "../actions";

export interface UpdateEntityState {
  loading: boolean,
  params?: UpdateEntityRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateEntityState = {
  loading: false
}

export default (state = initState, {type, params, response, error}: UpdateEntityAction): UpdateEntityState => {
  switch (type) {
    case Actions.UPDATE_CHAT_BOT_ENTITY:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.UPDATE_CHAT_BOT_ENTITY_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_CHAT_BOT_ENTITY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
