import {EmailLogsEntity} from "../../../types";
import {AppError} from "src/models/common";
import * as Actions from "../../actions";
import { EmailLogsAction } from "../../actions";

export interface EmailLogsState {
  loading: boolean,
  params?: any,
  rows?: EmailLogsEntity[]|any,
  total?: number|any,
  error?: AppError
}

const initState: EmailLogsState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: EmailLogsAction): EmailLogsState => {
  switch (type) {
    case Actions.GET_EMAIL_LOGS:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_EMAIL_LOGS_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_EMAIL_LOGS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
