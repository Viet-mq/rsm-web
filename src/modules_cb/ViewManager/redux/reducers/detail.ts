import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetDetailViewAction} from "../actions";

export interface GetDetailViewState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: ViewEntity[]|any,
  error?: AppError
}

const initState: GetDetailViewState = {
  loading: false,
  total: 0,
  rows:[],
  params: {}
}

export default (state = initState, {
  type,
  total,
  rows,
  params,
  error
}: GetDetailViewAction): GetDetailViewState => {
  switch (type) {
    case Actions.GET_DETAIL_VIEW:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_DETAIL_VIEW_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_DETAIL_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
