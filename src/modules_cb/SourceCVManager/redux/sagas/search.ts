import {getSearchSourceCVError, getSearchSourceCVSuccess, SearchSourceCVAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchSourceCVAsync(action: SearchSourceCVAction) {
  try {
    const rs = yield apis.getListSourceCV(action.params);
    if (rs.code !== 0) {
      yield put(getSearchSourceCVError(new AppError(rs.message)));
      NotificationError('Lấy danh sách Nguồn ứng viên không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(getSearchSourceCVSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchSourceCVError(new AppError(e.message)));
    NotificationError('Lấy danh sách Nguồn ứng viên không thành công', "Lỗi: " + e.message);
  }
}
