import {getListEmailError, getListEmailSuccess, ListEmailAction, searchListEmail} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListEmailAsync(action: ListEmailAction) {
  try {
    const rs = yield apis.getListEmail(action.params);
    if (rs.code !== 0) {
      yield put(getListEmailError(new AppError(rs.message)));

      NotificationError('Lấy danh sách email không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(getListEmailSuccess(rs.total, rs.rows))
      yield put(searchListEmail(action.params))

    }
  } catch (e) {
    yield put(getListEmailError(new AppError(e.message)));
    NotificationError('Lấy danh sách email không thành công', "Lỗi: " + e.message);
  }
}
