import {
  getListScript,
  showFormUpdateScript,
  UpdateScriptAction,
  updateScriptError,
  updateScriptSuccess
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateScriptAsync(action: UpdateScriptAction) {
  try {
    const rs = yield apis.updateScript(action.request);
    yield put(updateScriptSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Sửa kịch bản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Sửa kịch bản thành công");
      yield put(showFormUpdateScript(false));
      const params = yield select((state: RootState) => state.scriptManager.list.params);
      yield put(getListScript(params));
    }
  } catch (e) {
    yield put(updateScriptError(new AppError(e.message, -1)));
    NotificationError('Sửa kịch bản không thành công', "Lỗi: " + e.message)
  }
}
