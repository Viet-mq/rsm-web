import {JobListAction, getListJobError, getListJobSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListJobAsync(action: JobListAction) {
  try {
    const rs = yield apis.getListJob(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách Job không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListJobSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListJobError(new AppError(e.message)));
    NotificationError('Lấy danh sách Job không thành công', "Lỗi: " + e.message);
  }
}
