import {RemoveStepScriptRequest, UpdateStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface RemoveStepScriptAction {
  type: string,
  request?: RemoveStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const REMOVE_STEP_SCRIPT = "REMOVE_STEP_SCRIPT";
export const REMOVE_STEP_SCRIPT_SUCCESS = "REMOVE_STEP_SCRIPT_SUCCESS";
export const REMOVE_STEP_SCRIPT_ERROR = "REMOVE_STEP_SCRIPT_ERROR";

export const removeStep = (request?: RemoveStepScriptRequest): RemoveStepScriptAction => ({
  type: REMOVE_STEP_SCRIPT,
  request
});

export const removeStepSuccess = (response?: ResponseBase2): RemoveStepScriptAction => ({
  type: REMOVE_STEP_SCRIPT_SUCCESS,
  response
});

export const removeStepError = (error?: AppError): RemoveStepScriptAction => ({
  type: REMOVE_STEP_SCRIPT_ERROR,
  error
});
