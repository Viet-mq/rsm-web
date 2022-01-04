import {removeStepError, RemoveStepScriptAction, removeStepSuccess} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* removeStepScriptAsync(action: RemoveStepScriptAction) {
  try {
    const rs = yield apis.removeStepScript(action.request);
    yield put(removeStepSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa bước không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa bước thành công");
    }
  } catch (e) {
    yield put(removeStepError(new AppError(e.message, -1)));
    NotificationError('Xóa bước không thành công', "Lỗi: " + e.message)
  }
}
