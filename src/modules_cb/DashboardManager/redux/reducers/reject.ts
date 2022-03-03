import {RejectReportEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RejectReportAction} from "../actions";

export interface RejectReportState {
  loading: boolean,
  params?: any,
  rows?: RejectReportEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RejectReportState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: RejectReportAction): RejectReportState => {
  switch (type) {
    case Actions.REJECT_REPORT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.REJECT_REPORT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.REJECT_REPORT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
