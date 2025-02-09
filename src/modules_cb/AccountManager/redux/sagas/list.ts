import {AccountListAction, getListAccountError, getListAccountSuccess, getSearchAccount} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListAccountAsync(action: AccountListAction) {
  try {
    const rs = yield apis.getListAccount(action.params);
    if (rs.code !== 0) {
      yield put(getListAccountError(new AppError(rs.message)));
      NotificationError('Lấy danh sách tài khoản không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-account", JSON.stringify(rs || {}));
      yield put(getListAccountSuccess(rs.total, rs.rows))
      yield put(getSearchAccount(action.params))
    }
  } catch (e) {
    yield put(getListAccountError(new AppError(e.message)));
    NotificationError('Lấy danh sách tài khoản không thành công', "Lỗi: " + e.message);
  }
}
