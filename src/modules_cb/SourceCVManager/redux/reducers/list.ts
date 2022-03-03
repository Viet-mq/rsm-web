import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SourceCVListAction} from "../actions";

export interface SourceCVListState {
  loading: boolean,
  params?: any,
  rows?: SourceCVEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SourceCVListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}
const saveSourceCV:any=localStorage.getItem('list-source-cv');
const dataSourceCV:SourceCVListState = JSON.parse(saveSourceCV)?JSON.parse(saveSourceCV):initState

export default (state = dataSourceCV, {type, total, rows, params, error}: SourceCVListAction): SourceCVListState => {
  switch (type) {
    case Actions.GET_LIST_SOURCE_CV:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_SOURCE_CV_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_SOURCE_CV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
