import {APIRolesListAction, getListAPIRolesError, getListAPIRolesSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListAPIRolesAsync(action: APIRolesListAction) {
  try {
    const rs = yield apis.getListAPIRoles(action.params);
    if (rs.code !== 0) {
      yield put(getListAPIRolesError(new AppError(rs.message)));
      NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-api-roles", JSON.stringify(rs || {}));
      yield put(getListAPIRolesSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListAPIRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + e.message);
  }
}
