import {getListJobLevelError, getListJobLevelSuccess, JobLevelListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListJobLevelAsync(action: JobLevelListAction) {
  try {
    const rs = yield apis.getListJobLevel(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách cấp bậc công việc không thành công', "Lỗi: " + rs.message);

    } else {
      localStorage.setItem("list-job-level", JSON.stringify(rs || {}));
      yield put(getListJobLevelSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListJobLevelError(new AppError(e.message)));
    NotificationError('Lấy danh sách cấp bậc công việc không thành công', "Lỗi: " + e.message);
  }
}
