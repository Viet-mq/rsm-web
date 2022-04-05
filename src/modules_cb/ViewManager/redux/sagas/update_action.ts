import {
  getDetailView,
  showViewUpdateActionForm,
  updateActionError,
  updateActionSuccess,
  UpdateActionViewAction
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateActionViewAsync(action: UpdateActionViewAction) {
  try {
    const rs = yield apis.updateActionView(action.request);
    yield put(updateActionSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateActionError(new AppError(rs.message, -1)));
      NotificationError('Cập nhật action không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật action thành công");
      yield put(showViewUpdateActionForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      const paramsDetail = yield select((state: RootState) => state.viewManager.detail.params);
      yield put(getDetailView(paramsDetail));
    }
  } catch (e) {
    yield put(updateActionError(new AppError(e.message, -1)));
  }
}
