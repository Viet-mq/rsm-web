import {updateStepError, UpdateStepScriptAction, updateStepSuccess} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* updateStepScriptAsync(action: UpdateStepScriptAction) {
  try {
    const rs = yield apis.updateStepScript(action.request);
    yield put(updateStepSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Update bước không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Update bước thành công");
    }
  } catch (e) {
    yield put(updateStepError(new AppError(e.message, -1)));
    NotificationError('Update bước không thành công', "Lỗi: " + e.message)
  }
}
