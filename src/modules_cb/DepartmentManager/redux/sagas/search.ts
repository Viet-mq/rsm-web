import {
  DepartmentListAction,
  getListDepartmentError,
  getListDepartmentSuccess, searchListDepartmentError,
  searchListDepartmentSuccess
} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchListDepartmentAsync(action: DepartmentListAction) {
  try {
    const rs = yield apis.getListDepartment(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(searchListDepartmentSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(searchListDepartmentError(new AppError(e.message)));
    NotificationError('Lấy danh sách phòng ban không thành công', "Lỗi: " + e.message);
  }
}
