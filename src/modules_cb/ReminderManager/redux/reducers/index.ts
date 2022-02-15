import {combineReducers} from "redux";
import createReminder, {CreateReminderState} from "./reminder/createReminder";
import deleteReminder, {DeleteReminderState} from "./reminder/deleteReminder";
import listReminder, {GetListReminderState} from "./reminder/getListReminder";
import showReminder, {ShowReminderState} from "./reminder/showReminder";
import updateReminder, {UpdateReminderState} from "./reminder/updateReminder";

export interface ReminderManagerModuleState {
  createReminder: CreateReminderState,
  deleteReminder: DeleteReminderState,
  listReminder: GetListReminderState,
  showReminder: ShowReminderState,
  updateReminder: UpdateReminderState,
}

export default combineReducers<ReminderManagerModuleState>({

  createReminder,
  deleteReminder,
  listReminder,
  showReminder,
  updateReminder,

});
