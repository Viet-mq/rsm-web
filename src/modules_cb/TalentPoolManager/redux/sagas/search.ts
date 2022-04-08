import {getSearchTalentPoolError, getSearchTalentPoolSuccess, SearchTalentPoolAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchTalentPoolAsync(action: SearchTalentPoolAction) {
  try {
    const rs = yield apis.getListTalentPool(action.params);
    if (rs.code !== 0) {
      yield put(getSearchTalentPoolError(new AppError(rs.message)));
      NotificationError('Lấy danh sách Talent Pool không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(getSearchTalentPoolSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchTalentPoolError(new AppError(e.message)));
    NotificationError('Lấy danh sách Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
