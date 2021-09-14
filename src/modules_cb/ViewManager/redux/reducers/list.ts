import {FrontendViewEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListFrontendViewAction} from "../actions";

export interface GetListFrontendViewState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: FrontendViewEntity[],
  error?: AppError
}

const initState: GetListFrontendViewState = {
  loading: false,
  total: 0,
  rows: [],
  params: {}
}

export default (state = initState, {
  type,
  total,
  rows,
  params,
  error
}: GetListFrontendViewAction): GetListFrontendViewState => {
  switch (type) {
    case Actions.GET_LIST_FRONT_END_VIEW:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_FRONT_END_VIEW_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_FRONT_END_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
