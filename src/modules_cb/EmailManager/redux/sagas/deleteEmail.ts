import {DeleteEmailAction, deleteEmailError, deleteEmailSuccess, getListEmail, searchListEmail} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteEmailAsync(action: DeleteEmailAction) {
  try {
    const rs = yield apis.deleteEmail(action.request);
    yield put(deleteEmailSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteEmailError(new AppError(rs.message)));

      NotificationError('Xóa email không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Email thành công");
      const params = yield select((state: RootState) => state.jobManager.list.params);
      yield put(getListEmail(params))
    }
  } catch (e) {
    yield put(deleteEmailError(new AppError(e.message)));
    NotificationError('Xóa Email không thành công', "Lỗi: " + e.message);
  }
}
