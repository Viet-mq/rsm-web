import {GetListApiRoleAction, getListApiRoleError, getListApiRoleSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListApiRoleAsync(action: GetListApiRoleAction) {
  try {
    const rs = yield apis.getListApiRole(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách api không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListApiRoleSuccess(rs.rows, rs.total))
  } catch (e) {
    yield put(getListApiRoleError(new AppError(e.message)));
    NotificationError('Lấy danh sách api không thành công', "Lỗi: " + e.message);
  }
}
