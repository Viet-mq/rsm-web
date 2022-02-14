import {GetListReminderAction, getReminderError, getReminderSuccess} from "../../actions";
import * as apis from '../../services/apis'
import {NotificationError} from "../../../../../components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";

export function* getListReminderAsync(action: GetListReminderAction) {
  try {
    const rs = yield apis.getListReminder(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách nhắc nhở không thành công', "Lỗi: " + rs.message);
    }
    yield put(getReminderSuccess(rs))
  } catch (e) {
    yield put(getReminderError(new AppError(e.message)));
    NotificationError('Lấy danh sách nhắc nhở không thành công', "Lỗi: " + e.message);
  }
}
