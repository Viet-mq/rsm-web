import {DeleteAccountAction, deleteAccountError, deleteAccountSuccess, getListAccount} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteAccountAsync(action: DeleteAccountAction) {
  try {
    const rs = yield apis.deleteAccount(action.request);
    yield put(deleteAccountSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa tài khoản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa tài khoản thành công");
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
    }
  } catch (e) {
    yield put(deleteAccountError(new AppError(e.message)));
    NotificationError('Xóa tài khoản không thành công', "Lỗi: " + e.message);
  }
}
