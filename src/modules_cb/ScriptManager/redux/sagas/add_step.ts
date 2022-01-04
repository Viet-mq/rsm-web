import {addStepError, addStepSuccess, DeleteScriptAction} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* addStepScriptAsync(action: DeleteScriptAction) {
  try {
    const rs = yield apis.addStepScript(action.request);
    yield put(addStepSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm bước không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm bước thành công");
    }
  } catch (e) {
    yield put(addStepError(new AppError(e.message, -1)));
    NotificationError('Thêm bước không thành công', "Lỗi: " + e.message)
  }
}
