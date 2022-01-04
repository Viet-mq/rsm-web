import {RemoveStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {RemoveStepScriptAction} from "../actions";

export interface RemoveStepScriptState {
  loading: boolean,
  request?: RemoveStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: RemoveStepScriptState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: RemoveStepScriptAction): RemoveStepScriptState => {
  switch (type) {
    case Actions.REMOVE_STEP_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.REMOVE_STEP_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.REMOVE_STEP_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
