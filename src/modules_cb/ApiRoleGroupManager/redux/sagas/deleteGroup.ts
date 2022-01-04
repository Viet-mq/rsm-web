import {DeleteApiGroupAction, deleteApiGroupError, deleteApiGroupSuccess, getListApiGroup} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteGroupApiAsync(action: DeleteApiGroupAction) {
  try {
    const rs = yield apis.deleteGroupApiRole(action.request);
    yield put(deleteApiGroupSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa Group API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Group API thành công");
      const params = yield select((state: RootState) => state.apiRoleGroupManager.list.params);
      yield put(getListApiGroup(params));
    }
  } catch (e) {
    yield put(deleteApiGroupError(new AppError(e.message, -1)));
  }
}
