import {APIRolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchAPIRolesAction} from "../actions";

export interface SearchAPIRolesState {
  loading: boolean,
  params?: any,
  rows?: APIRolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchAPIRolesState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchAPIRolesAction): SearchAPIRolesState => {
  switch (type) {
    case Actions.GET_SEARCH_API_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_API_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_API_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
