import {AppError, ResponseBase2} from "src/models/common";
import {UpdateChatBotIntentRequest} from "../../types";
import * as Actions from "../actions";
import {UpdateIntentAction} from "../actions";

export interface UpdateIntentState {
  loading: boolean,
  request?: UpdateChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateIntentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateIntentAction): UpdateIntentState => {
  switch (type) {
    case Actions.INTENT_UPDATE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.INTENT_UPDATE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.INTENT_UPDATE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
