import {DepartmentEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {DepartmentListAction} from "../actions";

export interface DepartmentListState {
  loading: boolean,
  params?: any,
  rows?: DepartmentEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: DepartmentListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: DepartmentListAction): DepartmentListState => {
  switch (type) {
    case Actions.GET_LIST_DEPARTMENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_DEPARTMENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_DEPARTMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
