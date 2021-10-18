import * as apis from '../../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {GetListGroupAPIAction, getListGroupAPIError, getListGroupAPISuccess} from "../../actions";

export function* getListGroupAPIAsync(action: GetListGroupAPIAction) {
  try {
    const rs = yield apis.getListGroupAPI(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách group api không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListGroupAPISuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListGroupAPIError(new AppError(e.message)));
    NotificationError('Lấy danh sách group api không thành công', "Lỗi: " + e.message);
  }
}
