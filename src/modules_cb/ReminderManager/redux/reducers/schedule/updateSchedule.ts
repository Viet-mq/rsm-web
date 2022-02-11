import {UpdateScheduleRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateScheduleAction} from "../../actions";

export interface UpdateScheduleState {
  loading: boolean,
  request?: UpdateScheduleRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateScheduleState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateScheduleAction): UpdateScheduleState => {
  switch (type) {
    case Actions.UPDATE_SCHEDULE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_SCHEDULE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
