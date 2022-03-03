import {UserAccount} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchAccountAction} from "../actions";

export interface SearchAccountState {
  loading: boolean,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

const initState: SearchAccountState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchAccountAction): SearchAccountState => {
  switch (type) {
    case Actions.GET_SEARCH_ACCOUNT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
