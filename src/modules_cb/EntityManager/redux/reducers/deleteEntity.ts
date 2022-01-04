import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteEntityAction} from "../actions";

export interface DeleteEntityState {
  loading: boolean,
  entityId?: string,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteEntityState = {
  loading: false
}

export default (state = initState, {type, entityId, response, error}: DeleteEntityAction): DeleteEntityState => {
  switch (type) {
    case Actions.ENTITY_CHAT_BOT_DELETE:
      return {
        ...state,
        entityId,
        loading: true
      }
    case Actions.ENTITY_CHAT_BOT_DELETE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ENTITY_CHAT_BOT_DELETE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
