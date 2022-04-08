import {getListReminder, showFormUpdateReminder, UpdateReminderAction, updateReminderError, updateReminderSuccess} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateReminderAsync(action: UpdateReminderAction) {
  try {
    const rs = yield apis.updateReminder(action.request);
    yield put(updateReminderSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateReminderError(new AppError(rs.message)));
      NotificationError('Cập nhật nhắc nhở không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật nhắc nhở thành công");
      yield put(showFormUpdateReminder(false));
      const params = yield select((state: RootState) => state.reminderManager.listReminder.params);
      yield put(getListReminder(params))
    }
  } catch (e) {
    yield put(updateReminderError(new AppError(e.message)));
    NotificationError('Cập nhật nhắc nhở không thành công', "Lỗi: " + e.message);
  }
}
