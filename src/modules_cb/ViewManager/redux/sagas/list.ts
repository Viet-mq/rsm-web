import {GetListViewAction, getListViewError, getListViewSuccess, searchListView} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {RootState} from "../../../../redux/reducers";
import {getListAccount} from "../../../AccountManager/redux/actions";

export function* getListViewAsync(action: GetListViewAction) {
  try {
    const rs = yield apis.getListView(action.params);
    if (rs.code !== 0) {
      yield put(getListViewError(new AppError(rs.message)));
      NotificationError('Lấy danh sách view không thành công', "Lỗi: " + rs.message);
    }
    else{
      localStorage.setItem("list-view", JSON.stringify(rs || {}));
      yield put(getListViewSuccess(rs.total, rs.rows))
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
      yield put(searchListView(action.params));

    }
  } catch (e) {
    yield put(getListViewError(new AppError(e.message)));
    NotificationError('Lấy danh sách view không thành công', "Lỗi: " + e.message);
  }
}
