import {MenuFrontendEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListMenuFrontendAction} from "../actions";

export interface GetListMenuFrontendState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: MenuFrontendEntity[],
  error?: AppError
}

const initState: GetListMenuFrontendState = {
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
}: GetListMenuFrontendAction): GetListMenuFrontendState => {
  switch (type) {
    case Actions.GET_LIST_MENU_FRONTEND:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_MENU_FRONTEND_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_MENU_FRONTEND_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
