import {RolesListAction, getListRolesError, getListRolesSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListRolesAsync(action: RolesListAction) {
  try {
    const rs = yield apis.getListRoles(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách  Roles không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-roles", JSON.stringify(rs || {}));
      yield put(getListRolesSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách  Roles không thành công', "Lỗi: " + e.message);
  }
}
