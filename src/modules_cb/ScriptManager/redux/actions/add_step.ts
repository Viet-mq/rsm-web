import {AddStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AddStepScriptAction {
  type: string,
  request?: AddStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const ADD_STEP_SCRIPT = "ADD_STEP_SCRIPT";
export const ADD_STEP_SCRIPT_SUCCESS = "ADD_STEP_SCRIPT_SUCCESS";
export const ADD_STEP_SCRIPT_ERROR = "ADD_STEP_SCRIPT_ERROR";

export const addStep = (request?: AddStepScriptRequest): AddStepScriptAction => ({
  type: ADD_STEP_SCRIPT,
  request
});

export const addStepSuccess = (response?: ResponseBase2): AddStepScriptAction => ({
  type: ADD_STEP_SCRIPT_SUCCESS,
  response
});

export const addStepError = (error?: AppError): AddStepScriptAction => ({
  type: ADD_STEP_SCRIPT_ERROR,
  error
});
