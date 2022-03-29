import {
  CreateAPIRolesAction,
  createAPIRolesError,
  createAPIRolesSuccess,
  getListAPIRoles,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createAPIRolesAsync(action: CreateAPIRolesAction) {
  try {
    const rs = yield apis.createAPIRoles(action.request);
    yield put(createAPIRolesSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo API Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo API Roles thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.apiRolesManager.list.params);
      yield put(getListAPIRoles(params))
    }
  } catch (e) {
    yield put(createAPIRolesError(new AppError(e.message)));
    NotificationError('Tạo API Roles không thành công', "Lỗi: " + e.message);
  }
}
