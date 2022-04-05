import {getDetailView, getListView, removeActionError, removeActionSuccess, RemoveActionViewAction} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* removeActionViewAsync(action: RemoveActionViewAction) {
  try {
    const rs = yield apis.removeActionView(action.request);
    yield put(removeActionSuccess(rs));
    if (rs.code !== 0) {
      yield put(removeActionError(new AppError(rs.message, -1)));
      NotificationError('Xóa action không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa action thành công");
      const params = yield select((state: RootState) => state.viewManager.list.params);
      const paramsDetail = yield select((state: RootState) => state.viewManager.detail.params);
      yield put(getListView(params));
      yield put(getDetailView(paramsDetail));
    }
  } catch (e) {
    yield put(removeActionError(new AppError(e.message, -1)));
  }
}
