import {getSearchJobLevelError, getSearchJobLevelSuccess, SearchJobLevelAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchJobLevelAsync(action: SearchJobLevelAction) {
  try {
    const rs = yield apis.getListJobLevel(action.params);
    if (rs.code !== 0) {
      yield put(getSearchJobLevelError(new AppError(rs.message)));

      NotificationError('Lấy danh sách cấp bậc công việc không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(getSearchJobLevelSuccess(rs.total, rs.rows))
    }

  } catch (e) {
    yield put(getSearchJobLevelError(new AppError(e.message)));
    NotificationError('Lấy danh sách cấp bậc công việc không thành công', "Lỗi: " + e.message);
  }
}
