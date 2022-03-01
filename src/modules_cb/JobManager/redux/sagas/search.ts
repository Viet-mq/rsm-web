import {getSearchJobError, getSearchJobSuccess, SearchJobAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchJobAsync(action: SearchJobAction) {
  try {
    const rs = yield apis.getListJob(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách vị trí tuyển dụng không thành công', "Lỗi: " + rs.message);

    } else {

      yield put(getSearchJobSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchJobError(new AppError(e.message)));
    NotificationError('Lấy danh sách vị trí tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
