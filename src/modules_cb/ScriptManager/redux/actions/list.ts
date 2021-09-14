import {ScriptEntity} from "../../types";
import {AppError} from "src/models/common";

export interface GetListScriptAction {
  type: string,
  params?: any,
  rows?: ScriptEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_SCRIPT = "GET_LIST_SCRIPT";
export const GET_LIST_SCRIPT_SUCCESS = "GET_LIST_SCRIPT_SUCCESS";
export const GET_LIST_SCRIPT_ERROR = "GET_LIST_SCRIPT_ERROR";

export const getListScript = (params?: any): GetListScriptAction => ({
  type: GET_LIST_SCRIPT,
  params
});

export const getListScriptSuccess = (rows?: ScriptEntity[], total?: number,): GetListScriptAction => ({
  type: GET_LIST_SCRIPT_SUCCESS,
  rows,
  total
});

export const getListScriptError = (error?: AppError): GetListScriptAction => ({
  type: GET_LIST_SCRIPT_ERROR,
  error
});
