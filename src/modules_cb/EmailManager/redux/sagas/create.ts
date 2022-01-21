import {CreateEmailAction, createEmailError, createEmailSuccess, getListEmail} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import history from "../../../../history";

export function* createEmailAsync(action: CreateEmailAction) {
  try {
    const rs = yield apis.createEmail(action.request);
    yield put(createEmailSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Email không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Email thành công");
      history.push('/email-manager');
      const params = yield select((state: RootState) => state.emailManager.list.params);
      yield put(getListEmail(params))
    }
  } catch (e) {
    yield put(createEmailError(new AppError(e.message)));
    NotificationError('Tạo Email không thành công', "Lỗi: " + e.message);
  }
}
