import {
  CreateViewAction,
  createViewError,
  createViewSuccess,
  getListView,
  showViewCreateForm
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createViewAsync(action: CreateViewAction) {
  try {
    const rs = yield apis.createView(action.request);
    yield put(createViewSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo view thành công");
      yield put(showViewCreateForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListView(params));
    }
  } catch (e) {
    yield put(createViewError(new AppError(e.message, -1)));
  }
}
