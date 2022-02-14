import {DeleteReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteReminderAction} from "../../actions";

export interface DeleteReminderState {
  loading: boolean,
  request?: DeleteReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteReminderState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteReminderAction): DeleteReminderState => {
  switch (type) {
    case Actions.DELETE_REMINDER:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_REMINDER_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_REMINDER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
