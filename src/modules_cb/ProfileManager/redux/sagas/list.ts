import {getListProfileError, getListProfileSuccess, ProfileListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListProfileAsync(action: ProfileListAction) {
  try {
    const rs = yield apis.getListProfile(action.params);
    console.log("rs: " + JSON.stringify(rs));
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách Profile không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListProfileSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListProfileError(new AppError(e.message)));
    NotificationError('Lấy danh sách Profile không thành công', "Lỗi: " + e.message);
  }
}
