import {ActivityLogsEntity, ProfileEntity} from "../../../types";
import {AppError} from "src/models/common";
import * as Actions from "../../actions";
import { ActivityLogsAction } from "../../actions";

export interface ActivityLogsState {
  loading: boolean,
  params?: any,
  rows?: ActivityLogsEntity[],
  total?: number,
  error?: AppError
}

const initState: ActivityLogsState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: ActivityLogsAction): ActivityLogsState => {
  switch (type) {
    case Actions.GET_ACTIVITY:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_ACTIVITY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
