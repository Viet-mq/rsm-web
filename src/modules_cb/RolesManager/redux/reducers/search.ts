import {RolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchRolesAction} from "../actions";

export interface SearchRolesState {
  loading: boolean,
  params?: any,
  rows?: RolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchRolesState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchRolesAction): SearchRolesState => {
  switch (type) {
    case Actions.GET_SEARCH_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
