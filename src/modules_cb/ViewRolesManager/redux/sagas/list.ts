import {ViewRolesListAction, getListViewRolesError, getListViewRolesSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListViewRolesAsync(action: ViewRolesListAction) {
  try {
    const rs = yield apis.getListViewRoles(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách View Roles không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-view-roles", JSON.stringify(rs || {}));
      yield put(getListViewRolesSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListViewRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách View Roles không thành công', "Lỗi: " + e.message);
  }
}
