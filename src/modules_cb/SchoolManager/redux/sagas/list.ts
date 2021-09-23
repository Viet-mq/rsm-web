import {SchoolListAction, getListSchoolError, getListSchoolSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListSchoolAsync(action: SchoolListAction) {
  try {
    const rs = yield apis.getListSchool(action.params);
    console.log("rs: " + JSON.stringify(rs));
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListSchoolSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListSchoolError(new AppError(e.message)));
    NotificationError('Lấy danh sách trường không thành công', "Lỗi: " + e.message);
  }
}
