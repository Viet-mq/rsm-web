import {
  getListRoles,
  showFormUpdate,
  UpdateRolesAction,
  updateRolesError,
  updateRolesSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateRolesAsync(action: UpdateRolesAction) {
  try {
    const rs = yield apis.updateRoles(action.request);
    yield put(updateRolesSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật  Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật  Roles thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.rolesManager.list.params);
      yield put(getListRoles(params))
    }
  } catch (e) {
    yield put(updateRolesError(new AppError(e.message)));
    NotificationError('Cập nhật  Roles không thành công', "Lỗi: " + e.message);
  }
}
