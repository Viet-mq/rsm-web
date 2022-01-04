import {CreateScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {CreateScriptAction} from "../actions";

export interface CreateScriptState {
  loading: boolean,
  request?: CreateScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateScriptState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: CreateScriptAction): CreateScriptState => {
  switch (type) {
    case Actions.CREATE_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
