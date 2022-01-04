import {DeleteChatBotIntentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteIntentAction} from "../actions";

export interface DeleteIntentState {
  loading: boolean,
  request?: DeleteChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteIntentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: DeleteIntentAction): DeleteIntentState => {
  switch (type) {
    case Actions.INTENT_DELETE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.INTENT_DELETE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.INTENT_DELETE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
