import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListGroupAPI, RemoveAPIAction, removeAPIError, removeAPISuccess} from "../../actions";

export function* removeAPIAsync(action: RemoveAPIAction) {
  try {
    const rs = yield apis.removeAPI(action.request);
    yield put(removeAPISuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa api không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa api thành công");
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(removeAPIError(new AppError(e.message, -1)));
  }
}
