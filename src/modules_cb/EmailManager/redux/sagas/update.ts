import {getListEmail, showFormUpdate, UpdateEmailAction, updateEmailError, updateEmailSuccess} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import history from "../../../../history";

export function* updateEmailAsync(action: UpdateEmailAction) {
  try {
    const rs = yield apis.updateEmail(action.request);
    yield put(updateEmailSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateEmailError(new AppError(rs.message)));

      NotificationError('Cập nhật Email không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật Email thành công");
      history.push('/email-manager');
      const params = yield select((state: RootState) => state.emailManager.list.params);
      yield put(getListEmail(params))
    }
  } catch (e) {
    yield put(updateEmailError(new AppError(e.message)));
    NotificationError('Cập nhật Email không thành công', "Lỗi: " + e.message);
  }
}
