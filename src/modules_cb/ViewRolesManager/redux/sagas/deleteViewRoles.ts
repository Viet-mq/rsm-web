import {DeleteViewRolesAction, deleteViewRolesError, deleteViewRolesSuccess, getListViewRoles} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteViewRolesAsync(action: DeleteViewRolesAction) {
  try {
    const rs = yield apis.deleteViewRoles(action.request);
    yield put(deleteViewRolesSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa View Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa View Roles thành công");

      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListViewRoles(params))
    }
  } catch (e) {
    yield put(deleteViewRolesError(new AppError(e.message)));
    NotificationError('Xóa View Roles không thành công', "Lỗi: " + e.message);
  }
}
