import {CompanyListAction, getListCompanyError, getListCompanySuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListCompanyAsync(action: CompanyListAction) {
  try {
    const rs = yield apis.getListCompany(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách  Công ty không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-view-roles", JSON.stringify(rs || {}));
      yield put(getListCompanySuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListCompanyError(new AppError(e.message)));
    NotificationError('Lấy danh sách  Công ty không thành công', "Lỗi: " + e.message);
  }
}
