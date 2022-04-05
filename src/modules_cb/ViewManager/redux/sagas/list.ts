import {GetListViewAction, getListViewError, getListViewSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

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

    }
  } catch (e) {
    yield put(getListViewError(new AppError(e.message)));
    NotificationError('Lấy danh sách view không thành công', "Lỗi: " + e.message);
  }
}
