import {ReasonRejectEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchListReasonRejectAction} from "../actions";

export interface SearchListReasonRejectState {
  loading: boolean,
  params?: any,
  rows?: ReasonRejectEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchListReasonRejectState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchListReasonRejectAction): SearchListReasonRejectState => {
  switch (type) {
    case Actions.SEARCH_LIST_REASON_REJECT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_REASON_REJECT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_REASON_REJECT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
