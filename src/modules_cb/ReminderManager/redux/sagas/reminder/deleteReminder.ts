import {
  DeleteReminderAction,
  deleteReminderError,
  deleteReminderSuccess,
  getListReminder,
  showFormUpdateReminder
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteReminderAsync(action: DeleteReminderAction) {
  try {
    const rs = yield apis.deleteReminder(action.request);
    yield put(deleteReminderSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa nhắc nhở không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa nhắc nhở thành công");
      yield put(showFormUpdateReminder(false));
      const params = yield select((state: RootState) => state.reminderManager.listReminder.params);
      yield put(getListReminder(params))
    }
  } catch (e) {
    yield put(deleteReminderError(new AppError(e.message)));
    NotificationError('Xóa nhắc nhở không thành công', "Lỗi: " + e.message);
  }
}
