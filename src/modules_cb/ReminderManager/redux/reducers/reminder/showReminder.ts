import * as Actions from "../../actions";
import {ShowReminderAction} from "../../actions";
import {TimeReminder, UpdateReminderRequest} from "../../../types";

export interface ShowReminderState {
  show_reminder_update?: boolean,
  show_reminder_create?: boolean,
  data_update?: UpdateReminderRequest,
  time_create?: TimeReminder,
  time_update?: TimeReminder,

}

const initState: ShowReminderState = {
  show_reminder_update: false,
  show_reminder_create: false,
}

export default (state = initState, {
  type,
  show_reminder_update,
  show_reminder_create,
  data_update,
  time_create,
  time_update
}: ShowReminderAction): ShowReminderState => {
  switch (type) {
    case Actions.SHOW_FORM_REMINDER_CREATE:
      return {
        ...state,
        show_reminder_create,
        time_create,
        show_reminder_update: false,

      }
    case Actions.SHOW_FORM_REMINDER_UPDATE:
      return {
        ...state,
        show_reminder_update,
        data_update,
        show_reminder_create: false,
      }
    default:
      return state;
  }
}
