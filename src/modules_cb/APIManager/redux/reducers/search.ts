import {ApiEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchListApiAction} from "../actions";

export interface SearchListApiState {
  loading: boolean,
  params?: any,
  rows?: ApiEntity[]|any,
  total?: number|any,
  error?: AppError
}

const initState: SearchListApiState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchListApiAction): SearchListApiState => {
  switch (type) {
    case Actions.SEARCH_LIST_API:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_API_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
