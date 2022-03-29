import {DeleteAPIRolesAction, deleteAPIRolesError, deleteAPIRolesSuccess, getListAPIRoles} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteAPIRolesAsync(action: DeleteAPIRolesAction) {
  try {
    const rs = yield apis.deleteAPIRoles(action.request);
    yield put(deleteAPIRolesSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa API Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa API Roles thành công");

      const params = yield select((state: RootState) => state.apiRolesManager.list.params);
      yield put(getListAPIRoles(params))
    }
  } catch (e) {
    yield put(deleteAPIRolesError(new AppError(e.message)));
    NotificationError('Xóa API Roles không thành công', "Lỗi: " + e.message);
  }
}
