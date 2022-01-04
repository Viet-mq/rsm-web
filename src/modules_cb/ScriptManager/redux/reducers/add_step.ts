import {AddStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {AddStepScriptAction} from "../actions";

export interface AddStepScriptState {
  loading: boolean,
  request?: AddStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddStepScriptState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AddStepScriptAction): AddStepScriptState => {
  switch (type) {
    case Actions.ADD_STEP_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ADD_STEP_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ADD_STEP_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
