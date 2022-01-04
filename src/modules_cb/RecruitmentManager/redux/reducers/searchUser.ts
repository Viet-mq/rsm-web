import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchUserAction} from "../actions";
import {UserAccount} from "../../../AccountManager/types";

export interface SearchUserState {
  loading: boolean,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

const initState: SearchUserState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchUserAction): SearchUserState => {
  switch (type) {
    case Actions.SEARCH_USER:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_USER_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_USER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
