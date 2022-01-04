import {UpdateScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateScriptAction {
  type: string,
  request?: UpdateScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SCRIPT = "UPDATE_SCRIPT";
export const UPDATE_SCRIPT_SUCCESS = "UPDATE_SCRIPT_SUCCESS";
export const UPDATE_SCRIPT_ERROR = "UPDATE_SCRIPT_ERROR";

export const updateScript = (request?: UpdateScriptRequest): UpdateScriptAction => ({
  type: UPDATE_SCRIPT,
  request
});

export const updateScriptSuccess = (response?: ResponseBase2): UpdateScriptAction => ({
  type: UPDATE_SCRIPT_SUCCESS,
  response
});

export const updateScriptError = (error?: AppError): UpdateScriptAction => ({
  type: UPDATE_SCRIPT_ERROR,
  error
});
