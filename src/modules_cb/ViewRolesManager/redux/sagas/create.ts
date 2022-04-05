import {
  CreateViewRolesAction,
  createViewRolesError,
  createViewRolesSuccess,
  getListViewRoles,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createViewRolesAsync(action: CreateViewRolesAction) {
  try {
    const rs = yield apis.createViewRoles(action.request);
    yield put(createViewRolesSuccess(rs));
    if (rs.code !== 0) {
      yield put(createViewRolesError(new AppError(rs.message)));
      NotificationError('Tạo View Roles không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo View Roles thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListViewRoles(params))
    }
  } catch (e) {
    yield put(createViewRolesError(new AppError(e.message)));
    NotificationError('Tạo View Roles không thành công', "Lỗi: " + e.message);
  }
}
