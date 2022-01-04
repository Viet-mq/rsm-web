import {UpdateScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateScriptAction} from "../actions";

export interface UpdateScriptState {
  loading: boolean,
  request?: UpdateScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateScriptState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateScriptAction): UpdateScriptState => {
  switch (type) {
    case Actions.UPDATE_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
