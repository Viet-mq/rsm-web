import {GetListFrontendViewAction, getListFrontendViewError, getListFrontendViewSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListViewFrontEnd(action: GetListFrontendViewAction) {
  try {
    const rs = yield apis.getListViewFrontEnd(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách view không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListFrontendViewSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListFrontendViewError(new AppError(e.message)));
    NotificationError('Lấy danh sách view không thành công', "Lỗi: " + e.message);
  }
}
