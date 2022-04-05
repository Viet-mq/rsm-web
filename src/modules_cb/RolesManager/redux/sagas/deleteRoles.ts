import {DeleteRolesAction, deleteRolesError, deleteRolesSuccess, getListRoles} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteRolesAsync(action: DeleteRolesAction) {
  try {
    const rs = yield apis.deleteRoles(action.request);
    yield put(deleteRolesSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteRolesError(new AppError(rs.message)));
      NotificationError('Xóa  Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa  Roles thành công");

      const params = yield select((state: RootState) => state.rolesManager.list.params);
      yield put(getListRoles(params))
    }
  } catch (e) {
    yield put(deleteRolesError(new AppError(e.message)));
    NotificationError('Xóa  Roles không thành công', "Lỗi: " + e.message);
  }
}
