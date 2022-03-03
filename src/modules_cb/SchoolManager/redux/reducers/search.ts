import {SchoolEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchSchoolAction} from "../actions";

export interface SearchSchoolState {
  loading: boolean,
  params?: any,
  rows?: SchoolEntity[],
  total?: number,
  error?: AppError
}

const initState: SearchSchoolState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchSchoolAction): SearchSchoolState => {
  switch (type) {
    case Actions.GET_SEARCH_SCHOOL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_SCHOOL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_SCHOOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
