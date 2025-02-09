import {JobEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {JobListAction} from "../actions";

export interface JobListState {
  loading: boolean,
  params?: any,
  rows?: JobEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: JobListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveJob:any=localStorage.getItem('list-job');
const dataJob:JobListState = JSON.parse(saveJob)?JSON.parse(saveJob):initState

export default (state = dataJob, {type, total, rows, params, error}: JobListAction): JobListState => {
  switch (type) {
    case Actions.GET_LIST_JOB:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_JOB_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_JOB_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
