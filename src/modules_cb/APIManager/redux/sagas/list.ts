import {GetListApiAction, getListApiError, getListApiSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListApiAsync(action: GetListApiAction) {
  try {
    const rs = yield apis.getListApi(action.params);
    if (rs.code !== 0) {
      yield put(getListApiError(new AppError(rs.message)));
      NotificationError('Lấy danh sách API không thành công', "Lỗi: " + rs.message);
    }
    else{
      localStorage.setItem("list-api", JSON.stringify(rs || {}));
      yield put(getListApiSuccess(rs.rows, rs.total))
    }
  } catch (e) {
    yield put(getListApiError(new AppError(e.message)));
    NotificationError('Lấy danh sách API không thành công', "Lỗi: " + e.message);
  }
}
