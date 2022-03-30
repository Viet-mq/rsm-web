import {GetDetailViewAction, getDetailViewError, getDetailViewSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getDetailViewAsync(action: GetDetailViewAction) {
  try {
    const rs = yield apis.getListView(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy chi tiết view không thành công', "Lỗi: " + rs.message);
    }
    yield put(getDetailViewSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getDetailViewError(new AppError(e.message)));
    NotificationError('Lấy chi tiết view không thành công', "Lỗi: " + e.message);
  }
}
