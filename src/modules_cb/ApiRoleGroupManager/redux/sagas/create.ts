import {
  CreateApiGroupAction,
  createApiGroupError,
  createApiGroupSuccess,
  getListApiGroup,
  showApiGroupFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createGroupApiAsync(action: CreateApiGroupAction) {
  try {
    const rs = yield apis.createGroupApiRole(action.request);
    yield put(createApiGroupSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Group API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Group API thành công");
      yield put(showApiGroupFormCreate(false));
      const params = yield select((state: RootState) => state.apiRoleGroupManager.list.params);
      yield put(getListApiGroup(params));
    }
  } catch (e) {
    yield put(createApiGroupError(new AppError(e.message, -1)));
  }
}
