import {JobEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchJobAction} from "../actions";

export interface SearchJobState {
  loading: boolean,
  params?: any,
  rows?: JobEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchJobState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchJobAction): SearchJobState => {
  switch (type) {
    case Actions.GET_SEARCH_JOB:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_JOB_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_JOB_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
