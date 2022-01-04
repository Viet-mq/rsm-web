import {
  CreateScriptAction,
  createScriptError,
  createScriptSuccess,
  getListScript,
  showFormCreateScript
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createScriptAsync(action: CreateScriptAction) {
  try {
    const rs = yield apis.createScript(action.request);
    yield put(createScriptSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm kịch bản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm kịch bản thành công");
      yield put(showFormCreateScript(false));
      const params = yield select((state: RootState) => state.scriptManager.list.params);
      yield put(getListScript(params));
    }
  } catch (e) {
    yield put(createScriptError(new AppError(e.message, -1)));
    NotificationError('Thêm kịch bản không thành công', "Lỗi: " + e.message)
  }
}
