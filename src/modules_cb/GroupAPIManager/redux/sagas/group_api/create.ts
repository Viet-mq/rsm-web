
import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  CreateGroupAPIAction,
  createGroupAPIError,
  createGroupAPISuccess,
  getListGroupAPI,
  showCreateGroupAPIForm
} from "../../actions";

export function* createGroupAPIAsync(action: CreateGroupAPIAction) {
  try {
    const rs = yield apis.createGroupAPI(action.request);
    yield put(createGroupAPISuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo group API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo group API thành công");
      yield put(showCreateGroupAPIForm(false));
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(createGroupAPIError(new AppError(e.message, -1)));
  }
}
