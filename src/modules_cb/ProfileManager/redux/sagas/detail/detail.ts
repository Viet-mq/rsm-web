import {DetailProfileAction, getDetailProfileError, getDetailProfileSuccess} from "../../actions";
import * as apis from "../../services/apis";
import {put} from "redux-saga/effects";
import {NotificationError} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";

export function* getDetailProfileAsync(action: DetailProfileAction) {
  try {
    const rs = yield apis.getDetailProfile(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy thông tin chi tiết Profile không thành công', "Lỗi: " + rs.message)
    } else {
      yield put(getDetailProfileSuccess(rs.profile));

    }
  } catch (e) {
    yield put(getDetailProfileError(new AppError(e.message)));
    NotificationError('Lấy thông tin chi tiết Profile không thành công', "Lỗi: " + e.message);
  }
}
