import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchSourceCVAction} from "../actions";

export interface SearchSourceCVState {
  loading: boolean,
  params?: any,
  rows?: SourceCVEntity[] | any,
  total?: number,
  error?: AppError
}

const initState: SearchSourceCVState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchSourceCVAction): SearchSourceCVState => {
  switch (type) {
    case Actions.GET_SEARCH_SOURCE_CV:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_SOURCE_CV_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_SOURCE_CV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
