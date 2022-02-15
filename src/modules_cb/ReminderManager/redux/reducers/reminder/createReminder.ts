import {CreateReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateReminderAction} from "../../actions";

export interface CreateReminderState {
  loading: boolean,
  request?: CreateReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateReminderState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateReminderAction): CreateReminderState => {
  switch (type) {
    case Actions.CREATE_REMINDER:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_REMINDER_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_REMINDER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
