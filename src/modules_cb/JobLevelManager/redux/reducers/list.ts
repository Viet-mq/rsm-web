import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {JobLevelListAction} from "../actions";

export interface JobLevelListState {
  loading: boolean,
  params?: any,
  rows?: JobLevelEntity[],
  total?: number,
  error?: AppError
}

const initState: JobLevelListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: JobLevelListAction): JobLevelListState => {
  switch (type) {
    case Actions.GET_LIST_JOBLEVEL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_JOBLEVEL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_JOBLEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
