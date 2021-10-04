import {GetListIntentAction, getListIntentError, getListIntentSuccess} from "../actions";
import * as apis from '../apis';
import {put} from "redux-saga/effects";
import {AppError} from "../../../../models/common";
import {NotificationError} from "../../../../components/Notification/Notification";

export function* getListIntentAsync(action: GetListIntentAction) {
  try {
    const rs = yield apis.getListIntent(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách ý định không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListIntentSuccess(rs.rows, rs.total));
  } catch (e) {
    yield put(getListIntentError(new AppError(e.message)));
    NotificationError('Lấy danh sách ý định không thành công', "Lỗi: " + e.message);
  }
}
