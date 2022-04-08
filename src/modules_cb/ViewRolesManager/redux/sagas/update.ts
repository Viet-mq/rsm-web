import {
  getListViewRoles,
  showFormUpdate,
  UpdateViewRolesAction,
  updateViewRolesError,
  updateViewRolesSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateViewRolesAsync(action: UpdateViewRolesAction) {
  try {
    const rs = yield apis.updateViewRoles(action.request);
    yield put(updateViewRolesSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateViewRolesError(new AppError(rs.message)));
      NotificationError('Cập nhật View Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật View Roles thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListViewRoles(params))
    }
  } catch (e) {
    yield put(updateViewRolesError(new AppError(e.message)));
    NotificationError('Cập nhật View Roles không thành công', "Lỗi: " + e.message);
  }
}
