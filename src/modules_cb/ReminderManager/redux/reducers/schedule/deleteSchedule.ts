import * as Actions from "./../../actions";
import {DeleteScheduleAction} from "../../actions/schedule/deleteSchedule";
import {AppError, ResponseBase2} from "../../../../../models/common";
import {DeleteScheduleRequest} from "../../../types";

export interface DeleteScheduleState {
  loading: boolean,
  request?: DeleteScheduleRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteScheduleState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteScheduleAction): DeleteScheduleState => {
  switch (type) {
    case Actions.DELETE_SCHEDULE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_SCHEDULE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
