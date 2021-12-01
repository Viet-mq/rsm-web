import {CreateScheduleRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateScheduleAction} from "../../actions";

export interface CreateScheduleState {
  loading: boolean,
  request?: CreateScheduleRequest,
  response?: ResponseBase2,
  error?: AppError,
  count: number
}

const initState: CreateScheduleState = {
  loading: false,
  count: 0,
}

export default (state = initState, {type, request, response, error}: CreateScheduleAction): CreateScheduleState => {
  switch (type) {
    case Actions.CREATE_LIST_SCHEDULE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_LIST_SCHEDULE_SUCCESS:
      return {
        ...state,
        response,
        loading: false,
        count: ++state.count,
      }
    case Actions.CREATE_LIST_SCHEDULE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    case Actions.COUNT_SCHEDULE_NUMBER:
      return {
        ...state,
        count: 0,
        loading: false
      }
    default:
      return state;
  }
}
