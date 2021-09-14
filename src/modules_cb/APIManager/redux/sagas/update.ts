import {getListApiRole, showFormUpdateApi, UpdateAPIAction, updateApiError, updateApiSuccess} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateApiAsync(action: UpdateAPIAction) {
  try {
    const rs = yield apis.updateApiRole(action.request);
    yield put(updateApiSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Update API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Update API thành công");
      yield put(showFormUpdateApi(false));
      const params = yield select((state: RootState) => state.apiManager.list.params);
      yield put(getListApiRole(params));
    }
  } catch (e) {
    yield put(updateApiError(new AppError(e.message, -1)));
  }
}
