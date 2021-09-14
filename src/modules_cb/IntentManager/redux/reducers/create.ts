import {CreateChatBotIntentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateIntentAction} from "../actions";

export interface CreateIntentState {
  loading: boolean,
  request?: CreateChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateIntentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateIntentAction): CreateIntentState => {
  switch (type) {
    case Actions.INTENT_CREATE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.INTENT_CREATE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.INTENT_CREATE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}

