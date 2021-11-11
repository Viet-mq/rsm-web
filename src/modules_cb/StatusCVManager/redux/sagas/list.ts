import {getListStatusCVError, getListStatusCVSuccess, StatusCVListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListStatusCVAsync(action: StatusCVListAction) {
  try {
    const rs = yield apis.getListStatusCV(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách trạng thái CV không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-status-cv", JSON.stringify(rs || {}));
      yield put(getListStatusCVSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListStatusCVError(new AppError(e.message)));
    NotificationError('Lấy danh sách trạng thái CV không thành công', "Lỗi: " + e.message);
  }
}
