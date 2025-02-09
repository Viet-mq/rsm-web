import {
  CreateRolesAction,
  createRolesError,
  createRolesSuccess,
  getListRoles,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createRolesAsync(action: CreateRolesAction) {
  try {
    const rs = yield apis.createRoles(action.request);
    yield put(createRolesSuccess(rs));
    if (rs.code !== 0) {
      yield put(createRolesError(new AppError(rs.message)));
      NotificationError('Tạo  Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo  Roles thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.rolesManager.list.params);
      yield put(getListRoles(params))
    }
  } catch (e) {
    yield put(createRolesError(new AppError(e.message)));
    NotificationError('Tạo  Roles không thành công', "Lỗi: " + e.message);
  }
}
