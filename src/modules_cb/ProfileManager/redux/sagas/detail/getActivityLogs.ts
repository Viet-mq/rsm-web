import {
  ActivityLogsAction,
  getActivityLogsError,
  getActivityLogsSuccess,
} from "../../actions";
import * as apis from '../../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getActivityLogsAsync(action: ActivityLogsAction) {
  try {
    const rs = yield apis.getActivityLogs(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy lịch sử hoạt động không thành công', "Lỗi: " + rs.message);
    }
    yield put(getActivityLogsSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getActivityLogsError(new AppError(e.message)));
    NotificationError('Lấy lịch sử hoạt động không thành công', "Lỗi: " + e.message);
  }
}
