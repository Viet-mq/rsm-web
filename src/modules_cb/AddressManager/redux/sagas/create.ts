import {
  CreateAddressAction,
  createAddressError,
  createAddressSuccess,
  getListAddress,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createAddressAsync(action: CreateAddressAction) {
  try {
    const rs = yield apis.createAddress(action.request);
    yield put(createAddressSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo địa chỉ không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo địa chỉ thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.addressManager.list.params);
      yield put(getListAddress(params))
    }
  } catch (e) {
    yield put(createAddressError(new AppError(e.message)));
    NotificationError('Tạo địa chỉ không thành công', "Lỗi: " + e.message);
  }
}
