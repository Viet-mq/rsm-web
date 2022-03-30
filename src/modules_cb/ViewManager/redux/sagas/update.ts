import {
  CreateViewAction,
  getListView,
  showViewUpdateForm,
  updateViewError,
  updateViewSuccess
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import history from "../../../../history";

export function* updateViewAsync(action: CreateViewAction) {
  try {
    const rs = yield apis.updateView(action.request);
    yield put(updateViewSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật view không thành công', "Lỗi: " + rs.message)
    } else {

      NotificationSuccess('Thành công', "Cập nhật view thành công");
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListView(params));
      history.push('/view-manager');
    }
  } catch (e) {
    yield put(updateViewError(new AppError(e.message, -1)));
  }
}
