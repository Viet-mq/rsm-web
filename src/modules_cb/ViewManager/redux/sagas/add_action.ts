import {
  addActionError,
  addActionSuccess,
  AddActionViewAction, getDetailView,
  getListView,
  showViewAddActionForm
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* addActionViewAsync(action: AddActionViewAction) {
  try {
    const rs = yield apis.addActionView(action.request);
    yield put(addActionSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm action không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm action thành công");
      yield put(showViewAddActionForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      const paramsDetail = yield select((state: RootState) => state.viewManager.detail.params);
      yield put(getListView(params));
      yield put(getDetailView(paramsDetail));
    }
  } catch (e) {
    yield put(addActionError(new AppError(e.message, -1)));
  }
}
