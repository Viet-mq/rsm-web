
import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  getListGroupAPI,
  showUpdateGroupAPIForm,
  UpdateGroupAPIAction,
  updateGroupAPIError,
  updateGroupAPISuccess
} from "../../actions";

export function* updateGroupAPIAsync(action: UpdateGroupAPIAction) {
  try {
    const rs = yield apis.updateGroupAPI(action.request);
    yield put(updateGroupAPISuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật group api không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật group api thành công");
      yield put(showUpdateGroupAPIForm(false));
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(updateGroupAPIError(new AppError(e.message, -1)));
  }
}
