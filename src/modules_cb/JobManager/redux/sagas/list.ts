import {JobListAction, getListJobError, getListJobSuccess, getSearchJob} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListJobAsync(action: JobListAction) {
  try {
    const rs = yield apis.getListJob(action.params);
    if (rs.code !== 0) {
      yield put(getListJobError(new AppError(rs.message)));

      NotificationError('Lấy danh sách vị trí công việc không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-job", JSON.stringify(rs || {}));
      yield put(getListJobSuccess(rs.total, rs.rows))
      yield put(getSearchJob(action.params))

    }
  } catch (e) {
    yield put(getListJobError(new AppError(e.message)));
    NotificationError('Lấy danh sách vị trí công việc không thành công', "Lỗi: " + e.message);
  }
}
