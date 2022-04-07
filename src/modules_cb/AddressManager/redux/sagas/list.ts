import {AddressListAction, getListAddressError, getListAddressSuccess, searchListAddress} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListAddressAsync(action: AddressListAction) {
  try {
    const rs = yield apis.getListAddress(action.params);
    if (rs.code !== 0) {
      yield put(getListAddressError(new AppError(rs.message)));
      NotificationError('Lấy danh sách địa chỉ không thành công', "Lỗi: " + rs.message);
      yield put(searchListAddress(action.params))

    }
    else {
      localStorage.setItem("list-address", JSON.stringify(rs || {}));
      yield put(getListAddressSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListAddressError(new AppError(e.message)));
    NotificationError('Lấy danh sách địa chỉ không thành công', "Lỗi: " + e.message);
  }
}
