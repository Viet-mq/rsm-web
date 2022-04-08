import {SearchListAddressAction, searchListAddressError, searchListAddressSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchListAddressAsync(action: SearchListAddressAction) {
  try {
    const rs = yield apis.getListAddress(action.params);
    if (rs.code !== 0) {
      yield put(searchListAddressError(new AppError(rs.message)));
      NotificationError('Lấy danh sách địa chỉ không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(searchListAddressSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(searchListAddressError(new AppError(e.message)));
    NotificationError('Lấy danh sách địa chỉ không thành công', "Lỗi: " + e.message);
  }
}
