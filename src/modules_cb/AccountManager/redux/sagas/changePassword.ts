import {
  ChangePasswordAction,
  changePasswordError,
  changePasswordSuccess,
  getListAccount,
  showFormChangePassword
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* changePasswordAsync(action: ChangePasswordAction) {
  try {
    const rs = yield apis.changePasswordAccount(action.request);
    yield put(changePasswordSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Đổi mật khẩu không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Đổi mật khẩu thành công");
      yield put(showFormChangePassword(false));
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
    }
  } catch (e) {
    yield put(changePasswordError(new AppError(e.message)));
    NotificationError('Đổi mật khẩu không thành công', "Lỗi: " + e.message);
  }
}
