import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchListViewAction} from "../actions";

export interface SearchListViewState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: ViewEntity[],
  error?: AppError
}

const initState: SearchListViewState = {
  loading: false,
  total: 0,
  rows: [],
  params: {}
}

export default (state = initState, {
  type,
  total,
  rows,
  params,
  error
}: SearchListViewAction): SearchListViewState => {
  switch (type) {
    case Actions.SEARCH_LIST_VIEW:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_VIEW_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
