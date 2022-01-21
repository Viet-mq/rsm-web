import {EmailEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {ListEmailAction} from "../actions";

export interface ListEmailState {
  loading: boolean,
  params?: any,
  rows?: EmailEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: ListEmailState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: ListEmailAction): ListEmailState => {
  switch (type) {
    case Actions.GET_LIST_EMAIL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_EMAIL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_EMAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
