import {getListApi, showFormUpdateApi, UpdateAPIAction, updateApiError, updateApiSuccess} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateApiAsync(action: UpdateAPIAction) {
  try {
    const rs = yield apis.updateApi(action.request);
    yield put(updateApiSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateApiError(new AppError(rs.message, -1)));

      NotificationError('Cập nhập API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhập API thành công");
      yield put(showFormUpdateApi(false));
      const params = yield select((state: RootState) => state.apiManager.list.params);
      yield put(getListApi(params));
    }
  } catch (e) {
    yield put(updateApiError(new AppError(e.message, -1)));
  }
}
