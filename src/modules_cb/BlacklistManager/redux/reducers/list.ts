import {BlacklistEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {BlacklistListAction} from "../actions";

export interface BlacklistListState {
  loading: boolean,
  params?: any,
  rows?: BlacklistEntity[],
  total?: number,
  error?: AppError
}

const initState: BlacklistListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: BlacklistListAction): BlacklistListState => {
  switch (type) {
    case Actions.GET_LIST_BLACKLIST:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_BLACKLIST_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_BLACKLIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
