import {
  getListAccount,
  showFormUpdate,
  UpdateAccountAction,
  updateAccountError,
  updateAccountSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateAccountAsync(action: UpdateAccountAction) {
  try {
    const rs = yield apis.updateAccount(action.request);
    yield put(updateAccountSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật tài khoản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật tài khoản thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
    }
  } catch (e) {
    yield put(updateAccountError(new AppError(e.message)));
    NotificationError('Cập nhật tài khoản không thành công', "Lỗi: " + e.message);
  }
}
