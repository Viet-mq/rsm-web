import {DeleteScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {DeleteScriptAction} from "../actions";

export interface DeleteScriptState {
  loading: boolean,
  request?: DeleteScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteScriptState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: DeleteScriptAction): DeleteScriptState => {
  switch (type) {
    case Actions.DELETE_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
