import {TimeReminder, UpdateReminderRequest} from "../../../types";

export interface ShowReminderAction {
  type: string,
  show_reminder_update?: boolean,
  show_reminder_create?: boolean,
  data_update?: UpdateReminderRequest,
  time_create?: TimeReminder,
  time_update?: TimeReminder,
}

export const SHOW_FORM_REMINDER_CREATE = "SHOW_FORM_REMINDER_CREATE";
export const SHOW_FORM_REMINDER_UPDATE = "SHOW_FORM_REMINDER_UPDATE";

export const showFormCreateReminder = (show: boolean, time_create?: TimeReminder): ShowReminderAction => ({
  type: SHOW_FORM_REMINDER_CREATE,
  show_reminder_create: show,
  time_create,
});

export const showFormUpdateReminder = (show: boolean, dataUpdate?: UpdateReminderRequest): ShowReminderAction => ({
  type: SHOW_FORM_REMINDER_UPDATE,
  show_reminder_update: show,
  data_update: dataUpdate
});
