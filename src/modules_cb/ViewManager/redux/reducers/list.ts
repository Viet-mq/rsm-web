import {ViewEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListViewAction} from "../actions";

export interface GetListViewState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: ViewEntity[],
  error?: AppError
}

const initState: GetListViewState = {
  loading: false,
  total: 0,
  rows: [],
  params: {}
}

const saveView: any = localStorage.getItem('list-view');
const dataView: GetListViewState = JSON.parse(saveView) ? JSON.parse(saveView) : initState

export default (state = dataView, {
  type,
  total,
  rows,
  params,
  error
}: GetListViewAction): GetListViewState => {
  switch (type) {
    case Actions.GET_LIST_VIEW:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_VIEW_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
