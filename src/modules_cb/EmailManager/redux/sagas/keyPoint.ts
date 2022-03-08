import {getKeyPointError, getKeyPointSuccess, KeyPointAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getKeyPointAsync(action: KeyPointAction) {
  try {
    const rs = yield apis.getKeyPoint(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách keypoint không thành công', "Lỗi: " + rs.message);

    } else {
      localStorage.setItem("list-key-point", JSON.stringify(rs || {}));
      yield put(getKeyPointSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getKeyPointError(new AppError(e.message)));
    NotificationError('Lấy danh sách keypoint không thành công', "Lỗi: " + e.message);
  }
}
