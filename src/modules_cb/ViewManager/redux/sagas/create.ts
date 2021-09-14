import {
  CreateViewAction,
  createViewFrontEndError,
  createViewFrontEndSuccess,
  getListFrontendView,
  showFrontEndViewCreateForm
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createFrontEndAsync(action: CreateViewAction) {
  try {
    const rs = yield apis.createViewFrontEnd(action.request);
    yield put(createViewFrontEndSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo view thành công");
      yield put(showFrontEndViewCreateForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListFrontendView(params));
    }
  } catch (e) {
    yield put(createViewFrontEndError(new AppError(e.message, -1)));
  }
}
