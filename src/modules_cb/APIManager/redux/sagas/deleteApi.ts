import {DeleteAPIAction, deleteApiError, deleteApiSuccess, getListApiRole} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteApiAsync(action: DeleteAPIAction) {
  try {
    const rs = yield apis.deleteApiRole(action.request);
    yield put(deleteApiSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa API thành công");
      const params = yield select((state: RootState) => state.apiManager.list.params);
      yield put(getListApiRole(params));
    }
  } catch (e) {
    yield put(deleteApiError(new AppError(e.message, -1)));
  }
}
