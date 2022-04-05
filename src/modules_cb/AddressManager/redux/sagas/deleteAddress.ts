import {DeleteAddressAction, deleteAddressError, deleteAddressSuccess, getListAddress} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteAddressAsync(action: DeleteAddressAction) {
  try {
    const rs = yield apis.deleteAddress(action.request);
    yield put(deleteAddressSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteAddressError(new AppError(rs.message)));

      NotificationError('Xóa địa chỉ không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa địa chỉ thành công");
      const params = yield select((state: RootState) => state.addressManager.list.params);
      yield put(getListAddress(params))
    }
  } catch (e) {
    yield put(deleteAddressError(new AppError(e.message)));
    NotificationError('Xóa địa chỉ không thành công', "Lỗi: " + e.message);
  }
}
