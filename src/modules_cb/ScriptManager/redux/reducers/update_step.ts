import {UpdateStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateStepScriptAction} from "../actions";

export interface UpdateStepScriptState {
  loading: boolean,
  request?: UpdateStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateStepScriptState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateStepScriptAction): UpdateStepScriptState => {
  switch (type) {
    case Actions.UPDATE_STEP_SCRIPT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_STEP_SCRIPT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_STEP_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
