import {ReasonRejectEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {ReasonRejectListAction} from "../actions";

export interface ReasonRejectListState {
  loading: boolean,
  params?: any,
  rows?: ReasonRejectEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: ReasonRejectListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveReasonReject:any=localStorage.getItem('list-reason-reject');
const dataReasonReject:ReasonRejectListState = JSON.parse(saveReasonReject)?JSON.parse(saveReasonReject):initState

export default (state = dataReasonReject, {type, total, rows, params, error}: ReasonRejectListAction): ReasonRejectListState => {
  switch (type) {
    case Actions.GET_LIST_REASON_REJECT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_REASON_REJECT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_REASON_REJECT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
