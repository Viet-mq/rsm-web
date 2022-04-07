import {getListViewRolesError, getListViewRolesSuccess, getSearchViewRoles, ViewRolesListAction} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {RootState} from "../../../../redux/reducers";
import {getListAccount} from "../../../AccountManager/redux/actions";

export function* getListViewRolesAsync(action: ViewRolesListAction) {
  try {
    const rs = yield apis.getListViewRoles(action.params);
    if (rs.code !== 0) {
      yield put(getListViewRolesError(new AppError(rs.message)));
      NotificationError('Lấy danh sách View Roles không thành công', "Lỗi: " + rs.message);

    } else {
      localStorage.setItem("list-view-roles", JSON.stringify(rs || {}));
      yield put(getListViewRolesSuccess(rs.total, rs.rows))
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
      yield put(getSearchViewRoles(action.params))

    }
  } catch (e) {
    yield put(getListViewRolesError(new AppError(e.message)));
    NotificationError('Lấy danh sách View Roles không thành công', "Lỗi: " + e.message);
  }
}
