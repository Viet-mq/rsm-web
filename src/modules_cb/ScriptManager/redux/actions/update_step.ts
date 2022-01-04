import {UpdateStepScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateStepScriptAction {
  type: string,
  request?: UpdateStepScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_STEP_SCRIPT = "UPDATE_STEP_SCRIPT";
export const UPDATE_STEP_SCRIPT_SUCCESS = "UPDATE_STEP_SCRIPT_SUCCESS";
export const UPDATE_STEP_SCRIPT_ERROR = "UPDATE_STEP_SCRIPT_ERROR";

export const updateStep = (request?: UpdateStepScriptRequest): UpdateStepScriptAction => ({
  type: UPDATE_STEP_SCRIPT,
  request
});

export const updateStepSuccess = (response?: ResponseBase2): UpdateStepScriptAction => ({
  type: UPDATE_STEP_SCRIPT_SUCCESS,
  response
});

export const updateStepError = (error?: AppError): UpdateStepScriptAction => ({
  type: UPDATE_STEP_SCRIPT_ERROR,
  error
});
