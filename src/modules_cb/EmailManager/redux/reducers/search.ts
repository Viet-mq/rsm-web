import {EmailEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchEmailAction} from "../actions";

export interface SearchEmailState {
  loading: boolean,
  params?: any,
  rows?: EmailEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchEmailState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchEmailAction): SearchEmailState => {
  switch (type) {
    case Actions.SEARCH_LIST_EMAIL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_EMAIL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_EMAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
