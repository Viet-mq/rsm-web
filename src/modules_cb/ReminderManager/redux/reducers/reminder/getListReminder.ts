import {ReminderEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetListReminderAction} from "../../actions";


export interface GetListReminderState {
  loading: boolean,
  params?: any,
  rows?: ReminderEntity|any,
  error?: AppError
}

const initState: GetListReminderState = {
  loading: false,
  params: {},
}

export default (state = initState, {
  type,
  params,
  error,
  rows
}: GetListReminderAction): GetListReminderState => {
  switch (type) {
    case Actions.GET_LIST_REMINDER:
      return {
        ...state,
        params,
        loading: false,
      }
    case Actions.GET_LIST_REMINDER_SUCCESS:
      return {
        ...state,
        rows,
        loading: false
      }
    case Actions.GET_LIST_REMINDER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
