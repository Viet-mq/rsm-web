import {
  CreateAccountAction,
  createAccountError,
  createAccountSuccess,
  getListAccount,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createAccountAsync(action: CreateAccountAction) {
  try {
    const rs = yield apis.createAccount(action.request);
    yield put(createAccountSuccess(rs));
    if (rs.code !== 0) {
      yield put(createAccountError(new AppError(rs.message)));

      NotificationError('Tạo tài khoản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo tài khoản thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
    }
  } catch (e) {
    yield put(createAccountError(new AppError(e.message)));
    NotificationError('Tạo tài khoản không thành công', "Lỗi: " + e.message);
  }
}
