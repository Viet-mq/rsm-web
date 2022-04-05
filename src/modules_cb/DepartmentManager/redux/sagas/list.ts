import {DepartmentListAction, getListDepartmentError, getListDepartmentSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListDepartmentAsync(action: DepartmentListAction) {
  try {
    const rs = yield apis.getListDepartment(action.params);
    if (rs.code !== 0) {
      yield put(getListDepartmentError(new AppError(rs.message)));

      NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-department", JSON.stringify(rs || {}));
      yield put(getListDepartmentSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListDepartmentError(new AppError(e.message)));
    NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + e.message);
  }
}
