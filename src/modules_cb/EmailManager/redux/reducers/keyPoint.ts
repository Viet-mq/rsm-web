import {KeyPointEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {KeyPointAction} from "../actions";

export interface KeyPointState {
  loading: boolean,
  params?: any,
  rows?: KeyPointEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: KeyPointState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveKeyPoint:any=localStorage.getItem('list-key-point');
const dataKeyPoint:KeyPointState = JSON.parse(saveKeyPoint)?JSON.parse(saveKeyPoint):initState

export default (state = dataKeyPoint, {type, total, rows, params, error}: KeyPointAction): KeyPointState => {
  switch (type) {
    case Actions.GET_KEY_POINT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_KEY_POINT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_KEY_POINT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
