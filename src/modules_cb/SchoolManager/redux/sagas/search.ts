import {
  getListSchoolError,
  getListSchoolSuccess,
  getSearchSchoolError,
  getSearchSchoolSuccess,
  SearchSchoolAction
} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchSchoolAsync(action: SearchSchoolAction) {
  try {
    const rs = yield apis.getListSchool(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(getSearchSchoolSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchSchoolError(new AppError(e.message)));
    NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + e.message);
  }
}
