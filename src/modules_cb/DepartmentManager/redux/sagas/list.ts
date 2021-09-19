import {DepartmentListAction, getListDepartmentError, getListDepartmentSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListDepartmentAsync(action: DepartmentListAction) {
  console.log("haah2");
  try {
    const rs = yield apis.getListDepartment(action.params);
    console.log("rs: " + JSON.stringify(rs));
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListDepartmentSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListDepartmentError(new AppError(e.message)));
    NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + e.message);
  }
}
