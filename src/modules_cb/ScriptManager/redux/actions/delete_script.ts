import {DeleteScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteScriptAction {
  type: string,
  request?: DeleteScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SCRIPT = "DELETE_SCRIPT";
export const DELETE_SCRIPT_SUCCESS = "DELETE_SCRIPT_SUCCESS";
export const DELETE_SCRIPT_ERROR = "DELETE_SCRIPT_ERROR";

export const deleteScript = (request?: DeleteScriptRequest): DeleteScriptAction => ({
  type: DELETE_SCRIPT,
  request
});

export const deleteScriptSuccess = (response?: ResponseBase2): DeleteScriptAction => ({
  type: DELETE_SCRIPT_SUCCESS,
  response
});

export const deleteScriptError = (error?: AppError): DeleteScriptAction => ({
  type: DELETE_SCRIPT_ERROR,
  error
});
