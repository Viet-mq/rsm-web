import {searchListEmailError, searchListEmailSuccess, SearchEmailAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchListEmailAsync(action: SearchEmailAction) {
  try {
    const rs = yield apis.getListEmail(action.params);
    if (rs.code !== 0) {
      yield put(searchListEmailError(new AppError(rs.message)));

      NotificationError('Lấy danh sách email không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(searchListEmailSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(searchListEmailError(new AppError(e.message)));
    NotificationError('Lấy danh sách email không thành công', "Lỗi: " + e.message);
  }
}
