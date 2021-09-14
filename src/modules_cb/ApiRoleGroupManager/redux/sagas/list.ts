import {GetListApiGroupAction, getListApiGroupError, getListApiGroupSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListGroupApiRoleAsync(action: GetListApiGroupAction) {
  try {
    const rs = yield apis.getListGroupApiRole(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách group api không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListApiGroupSuccess(rs.rows, rs.total))
  } catch (e) {
    yield put(getListApiGroupError(new AppError(e.message)));
    NotificationError('Lấy danh sách group api không thành công', "Lỗi: " + e.message);
  }
}
