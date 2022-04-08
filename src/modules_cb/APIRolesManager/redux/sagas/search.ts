import {getSearchAPIRolesError, getSearchAPIRolesSuccess, SearchAPIRolesAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchAPIRolesAsync(action: SearchAPIRolesAction) {
  try {
    const rs = yield apis.getListAPIRoles(action.params);
    if (rs.code !== 0) {
      yield put(getSearchAPIRolesError(new AppError(rs.message)));

      NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + rs.message);

    } else {

      yield put(getSearchAPIRolesSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchAPIRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + e.message);
  }
}
