import {CreateReminderAction, createReminderError, createReminderSuccess, getListReminder, showFormCreateReminder,} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createReminderAsync(action: CreateReminderAction) {
  try {
    const rs = yield apis.createReminder(action.request);
    yield put(createReminderSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo nhắc nhở không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo nhắc nhở thành công");
      yield put(showFormCreateReminder(false));
      const params = yield select((state: RootState) => state.reminderManager.listReminder.params);
      yield put(getListReminder(params))
    }
  } catch (e) {
    yield put(createReminderError(new AppError(e.message)));
    NotificationError('Tạo nhắc nhở không thành công', "Lỗi: " + e.message);
  }
}
