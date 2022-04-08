import {APIRolesListAction, getListAPIRolesError, getListAPIRolesSuccess, getSearchAPIRoles} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {RootState} from "../../../../redux/reducers";
import {getListAccount} from "../../../AccountManager/redux/actions";

export function* getListAPIRolesAsync(action: APIRolesListAction) {
  try {
    const rs = yield apis.getListAPIRoles(action.params);
    if (rs.code !== 0) {
      yield put(getListAPIRolesError(new AppError(rs.message)));
      NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-api-roles", JSON.stringify(rs || {}));
      yield put(getListAPIRolesSuccess(rs.total, rs.rows))

      yield put(getSearchAPIRoles(action.params))

    }
  } catch (e) {
    yield put(getListAPIRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách API Roles không thành công', "Lỗi: " + e.message);
  }
}
