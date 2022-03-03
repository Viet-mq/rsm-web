import {JobLevelEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {JobLevelListAction} from "../actions";

export interface JobLevelListState {
  loading: boolean,
  params?: any,
  rows?: JobLevelEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: JobLevelListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveJobLevel:any=localStorage.getItem('list-job-level');
const dataJobLevel:JobLevelListState = JSON.parse(saveJobLevel)?JSON.parse(saveJobLevel):initState


export default (state = dataJobLevel, {type, total, rows, params, error}: JobLevelListAction): JobLevelListState => {
  switch (type) {
    case Actions.GET_LIST_JOB_LEVEL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_JOB_LEVEL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_JOB_LEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
