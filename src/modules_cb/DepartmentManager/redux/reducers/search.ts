import {DepartmentEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {DepartmentListAction} from "../actions";

export interface SearchListDepartmentState {
  loading: boolean,
  params?: any,
  rows?: DepartmentEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchListDepartmentState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: DepartmentListAction): SearchListDepartmentState => {
  switch (type) {
    case Actions.SEARCH_LIST_DEPARTMENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_DEPARTMENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_DEPARTMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
