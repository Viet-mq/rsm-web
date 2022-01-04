import {DeleteScriptAction, deleteScriptError, deleteScriptSuccess, getListScript} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteScriptAsync(action: DeleteScriptAction) {
  try {
    const rs = yield apis.deleteScript(action.request);
    yield put(deleteScriptSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa kịch bản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa kịch bản thành công");
      const params = yield select((state: RootState) => state.scriptManager.list.params);
      yield put(getListScript(params));
    }
  } catch (e) {
    yield put(deleteScriptError(new AppError(e.message, -1)));
    NotificationError('Xóa kịch bản không thành công', "Lỗi: " + e.message)
  }
}
