import {getListProfileError, getListProfileSuccess, ProfileListAction} from "../../actions";
import * as apis from '../../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListProfileAsync(action: ProfileListAction) {
  try {
    const rs = yield apis.getListProfile(action.params);
    if (rs.code !== 0) {
      yield put(getListProfileError(new AppError(rs.message)));
      NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListProfileSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListProfileError(new AppError(e.message)));
    NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + e.message);
  }
}
