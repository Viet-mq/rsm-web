import {getSearchRolesError, getSearchRolesSuccess, SearchRolesAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchRolesAsync(action: SearchRolesAction) {
  try {
    const rs = yield apis.getListRoles(action.params);
    if (rs.code !== 0) {
      yield put(getSearchRolesError(new AppError(rs.message)));
      NotificationError('Lấy danh sách  Roles không thành công', "Lỗi: " + rs.message);

    } else {

      yield put(getSearchRolesSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách  Roles không thành công', "Lỗi: " + e.message);
  }
}
