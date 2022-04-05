import {getSearchCompanyError, getSearchCompanySuccess, SearchCompanyAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchCompanyAsync(action: SearchCompanyAction) {
  try {
    const rs = yield apis.getListCompany(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách  Công ty không thành công', "Lỗi: " + rs.message);

    } else {

      yield put(getSearchCompanySuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchCompanyError(new AppError(e.message)));
    NotificationError('Lấy danh sách  Công ty không thành công', "Lỗi: " + e.message);
  }
}
