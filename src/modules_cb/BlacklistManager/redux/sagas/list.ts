import {BlacklistListAction, getListBlacklistError, getListBlacklistSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListBlacklistAsync(action: BlacklistListAction) {
  try {
    const rs = yield apis.getListBlacklist(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách Blacklist không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListBlacklistSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListBlacklistError(new AppError(e.message)));
    NotificationError('Lấy danh sách Blacklist không thành công', "Lỗi: " + e.message);
  }
}
