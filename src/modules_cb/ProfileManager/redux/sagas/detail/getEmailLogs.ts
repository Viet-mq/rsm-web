import {
  EmailLogsAction,
  getEmailLogsError,
  getEmailLogsSuccess,
} from "../../actions";
import * as apis from '../../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getEmailLogsAsync(action: EmailLogsAction) {
  try {
    const rs = yield apis.getEmailLogs(action.params);
    if (rs.code !== 0) {
      yield put(getEmailLogsError(new AppError(rs.message)));

      NotificationError('Lấy lịch sử Email không thành công', "Lỗi: " + rs.message);
    }
    yield put(getEmailLogsSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getEmailLogsError(new AppError(e.message)));
    NotificationError('Lấy lịch sử Email không thành công', "Lỗi: " + e.message);
  }
}
