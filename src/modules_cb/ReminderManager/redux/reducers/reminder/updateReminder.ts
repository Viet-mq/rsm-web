import {UpdateReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateReminderAction} from "../../actions";

export interface UpdateReminderState {
  loading: boolean,
  request?: UpdateReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateReminderState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateReminderAction): UpdateReminderState => {
  switch (type) {
    case Actions.UPDATE_REMINDER:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_REMINDER_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_REMINDER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
