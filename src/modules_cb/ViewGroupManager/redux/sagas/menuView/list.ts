import {
  getListMenuFrontend,
  GetListMenuFrontendAction, getListMenuFrontendError, getListMenuFrontendSuccess
} from "../../actions";
import * as apis from '../../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListMenuFrontendAsync(action: GetListMenuFrontendAction) {
  try {
    const rs = yield apis.getListMenuFrontend(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách menu view không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListMenuFrontendSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListMenuFrontendError(new AppError(e.message)));
    NotificationError('Lấy danh sách menu view không thành công', "Lỗi: " + e.message);
  }
}
