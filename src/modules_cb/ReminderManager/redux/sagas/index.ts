import {all, takeLatest} from 'redux-saga/effects';
import {getListReminderAsync} from "./reminder/getReminder";
import {createReminderAsync} from "./reminder/createReminder";
import {updateReminderAsync} from "./reminder/updateReminder";
import {deleteReminderAsync} from "./reminder/deleteReminder";
import {CREATE_REMINDER, DELETE_REMINDER, GET_LIST_REMINDER, UPDATE_REMINDER} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_REMINDER, getListReminderAsync),
    yield takeLatest(CREATE_REMINDER, createReminderAsync),
    yield takeLatest(UPDATE_REMINDER, updateReminderAsync),
    yield takeLatest(DELETE_REMINDER, deleteReminderAsync),

  ]);
}
