import {
  getListAPIRoles,
  showFormUpdate,
  UpdateAPIRolesAction,
  updateAPIRolesError,
  updateAPIRolesSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateAPIRolesAsync(action: UpdateAPIRolesAction) {
  try {
    const rs = yield apis.updateAPIRoles(action.request);
    yield put(updateAPIRolesSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateAPIRolesError(new AppError(rs.message)));

      NotificationError('Cập nhật API Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật API Roles thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.apiRolesManager.list.params);
      yield put(getListAPIRoles(params))
    }
  } catch (e) {
    yield put(updateAPIRolesError(new AppError(e.message)));
    NotificationError('Cập nhật API Roles không thành công', "Lỗi: " + e.message);
  }
}
