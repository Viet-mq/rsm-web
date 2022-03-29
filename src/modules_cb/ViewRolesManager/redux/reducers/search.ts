import {ViewRolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchViewRolesAction} from "../actions";

export interface SearchViewRolesState {
  loading: boolean,
  params?: any,
  rows?: ViewRolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchViewRolesState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchViewRolesAction): SearchViewRolesState => {
  switch (type) {
    case Actions.GET_SEARCH_VIEW_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_VIEW_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_VIEW_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
