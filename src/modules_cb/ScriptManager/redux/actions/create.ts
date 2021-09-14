import {CreateScriptRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateScriptAction {
  type: string,
  request?: CreateScriptRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_SCRIPT = "CREATE_SCRIPT";
export const CREATE_SCRIPT_SUCCESS = "CREATE_SCRIPT_SUCCESS";
export const CREATE_SCRIPT_ERROR = "CREATE_SCRIPT_ERROR";

export const createScript = (request?: CreateScriptRequest): CreateScriptAction => ({
  type: CREATE_SCRIPT,
  request
});

export const createScriptSuccess = (response?: ResponseBase2): CreateScriptAction => ({
  type: CREATE_SCRIPT_SUCCESS,
  response
});

export const createScriptError = (error?: AppError): CreateScriptAction => ({
  type: CREATE_SCRIPT_ERROR,
  error
});
