import {getListTalentPoolError, getListTalentPoolSuccess, TalentPoolListAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListTalentPoolAsync(action: TalentPoolListAction) {
  try {
    const rs = yield apis.getListTalentPool(action.params);
    if (rs.code !== 0) {
      yield put(getListTalentPoolError(new AppError(rs.message)));
      NotificationError('Lấy danh sách Talent Pool không thành công', "Lỗi: " + rs.message);
    } else {
      localStorage.setItem("list-talent-pool", JSON.stringify(rs || {}));
      yield put(getListTalentPoolSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListTalentPoolError(new AppError(e.message)));
    NotificationError('Lấy danh sách Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
