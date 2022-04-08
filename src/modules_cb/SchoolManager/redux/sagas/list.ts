import {getListSchoolError, getListSchoolSuccess, getSearchSchool, SchoolListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListSchoolAsync(action: SchoolListAction) {
  try {
    const rs = yield apis.getListSchool(action.params);
    if (rs.code !== 0) {
      yield put(getListSchoolError(new AppError(rs.message)));
      NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-school", JSON.stringify(rs || {}));
      yield put(getListSchoolSuccess(rs.total, rs.rows))
      yield put(getSearchSchool(action.params))

    }
  } catch (e) {
    yield put(getListSchoolError(new AppError(e.message)));
    NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + e.message);
  }
}
