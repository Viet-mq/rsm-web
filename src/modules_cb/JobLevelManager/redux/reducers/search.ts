import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {JobLevelListAction} from "../actions";

export interface SearchJobLevelState {
  loading: boolean,
  params?: any,
  rows?: JobLevelEntity[] | any,
  total?: number,
  error?: AppError
}

const initState: SearchJobLevelState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: JobLevelListAction): SearchJobLevelState => {
  switch (type) {
    case Actions.GET_SEARCH_JOB_LEVEL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_JOB_LEVEL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_JOB_LEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
