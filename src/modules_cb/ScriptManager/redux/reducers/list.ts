import {ScriptEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListScriptAction} from "../actions";

export interface GetListScriptState {
  loading: boolean,
  params?: any,
  rows?: ScriptEntity[],
  total?: number,
  error?: AppError
}

const initState: GetListScriptState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, params, rows, total, error}: GetListScriptAction): GetListScriptState => {
  switch (type) {
    case Actions.GET_LIST_SCRIPT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_SCRIPT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_SCRIPT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
