import {getListSourceCVError, getListSourceCVSuccess, SourceCVListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListSourceCVAsync(action: SourceCVListAction) {
  try {
    const rs = yield apis.getListSourceCV(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách Nguồn ứng viên không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-source-cv", JSON.stringify(rs || {}));
      yield put(getListSourceCVSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListSourceCVError(new AppError(e.message)));
    NotificationError('Lấy danh sách Nguồn ứng viên không thành công', "Lỗi: " + e.message);
  }
}
