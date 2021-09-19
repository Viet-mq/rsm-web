import {SchoolEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SchoolListAction} from "../actions";

export interface SchoolListState {
  loading: boolean,
  params?: any,
  rows?: SchoolEntity[],
  total?: number,
  error?: AppError
}

const initState: SchoolListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SchoolListAction): SchoolListState => {
  switch (type) {
    case Actions.GET_LIST_SCHOOL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_SCHOOL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_SCHOOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
