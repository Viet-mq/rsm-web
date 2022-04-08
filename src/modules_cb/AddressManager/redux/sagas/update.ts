import {
  getListAddress,
  showFormUpdate,
  UpdateAddressAction,
  updateAddressError,
  updateAddressSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateAddressAsync(action: UpdateAddressAction) {
  try {
    const rs = yield apis.updateAddress(action.request);
    yield put(updateAddressSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateAddressError(new AppError(rs.message)));

      NotificationError('Cập nhật địa chỉ không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật địa chỉ thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.addressManager.list.params);
      yield put(getListAddress(params))
    }
  } catch (e) {
    yield put(updateAddressError(new AppError(e.message)));
    NotificationError('Cập nhật địa chỉ không thành công', "Lỗi: " + e.message);
  }
}
