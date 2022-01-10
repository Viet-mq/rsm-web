import {DetailTalentPoolAction, getDetailTalentPoolError, getDetailTalentPoolSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getDetailTalentPoolAsync(action: DetailTalentPoolAction) {
  try {
    const rs = yield apis.getListTalentPool(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy chi tiết Talent Pool không thành công', "Lỗi: " + rs.message);
    } else {
      console.log("rs.result:",rs.rows)
      yield put(getDetailTalentPoolSuccess(rs.rows))
    }
  } catch (e) {
    yield put(getDetailTalentPoolError(new AppError(e.message)));
    NotificationError('Lấy chi tiết Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
