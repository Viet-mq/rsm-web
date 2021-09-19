import {SourceCVEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SourceCVListAction} from "../actions";

export interface SourceCVListState {
  loading: boolean,
  params?: any,
  rows?: SourceCVEntity[],
  total?: number,
  error?: AppError
}

const initState: SourceCVListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SourceCVListAction): SourceCVListState => {
  switch (type) {
    case Actions.GET_LIST_SOURCECV:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_SOURCECV_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_SOURCECV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
