import {SearchAccountAction, getSearchAccountError, getSearchAccountSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchAccountAsync(action: SearchAccountAction) {
  try {
    const rs = yield apis.getListAccount(action.params);
    if (rs.code !== 0) {
      yield put(getSearchAccountError(new AppError(rs.message)));

      NotificationError('Lấy danh sách tài khoản không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(getSearchAccountSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchAccountError(new AppError(e.message)));
    NotificationError('Lấy danh sách tài khoản không thành công', "Lỗi: " + e.message);
  }
}
