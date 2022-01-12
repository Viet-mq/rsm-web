import {StatusCVEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {StatusCVListAction} from "../actions";

export interface StatusCVListState {
  loading: boolean,
  params?: any,
  rows?: StatusCVEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: StatusCVListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveStatusCV:any=localStorage.getItem('list-status-cv');
const dataStatusCV:StatusCVListState = JSON.parse(saveStatusCV)?JSON.parse(saveStatusCV):initState


export default (state = dataStatusCV, {type, total, rows, params, error}: StatusCVListAction): StatusCVListState => {
  switch (type) {
    case Actions.GET_LIST_STATUSCV:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_STATUSCV_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_STATUSCV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
