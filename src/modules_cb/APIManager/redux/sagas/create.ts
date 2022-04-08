import {CreateAPIAction, createApiError, createApiSuccess, getListApi, showFormCreateApi} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createApiAsync(action: CreateAPIAction) {
  try {
    const rs = yield apis.createApi(action.request);
    yield put(createApiSuccess(rs));
    if (rs.code !== 0) {
      yield put(createApiError(new AppError(rs.message, -1)));

      NotificationError('Tạo API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo API thành công");
      yield put(showFormCreateApi(false));
      const params = yield select((state: RootState) => state.apiManager.list.params);
      yield put(getListApi(params));
    }
  } catch (e) {
    yield put(createApiError(new AppError(e.message, -1)));

  }
}
