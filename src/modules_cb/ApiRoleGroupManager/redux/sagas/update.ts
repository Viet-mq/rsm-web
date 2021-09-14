import {
  getListApiGroup,
  showApiGroupFormUpdate,
  UpdateApiGroupAction,
  updateApiGroupError,
  updateApiGroupSuccess
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateGroupApiAsync(action: UpdateApiGroupAction) {
  try {
    const rs = yield apis.updateGroupApiRole(action.request);
    yield put(updateApiGroupSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật Group API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật Group API thành công");
      yield put(showApiGroupFormUpdate(false));
      const params = yield select((state: RootState) => state.apiRoleGroupManager.list.params);
      yield put(getListApiGroup(params));
    }
  } catch (e) {
    yield put(updateApiGroupError(new AppError(e.message, -1)));
  }
}
