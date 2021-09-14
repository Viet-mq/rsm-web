import {
  CreateViewAction,
  getListFrontendView,
  showFrontEndViewUpdateForm,
  updateViewFrontEndError,
  updateViewFrontEndSuccess
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateFrontEndAsync(action: CreateViewAction) {
  try {
    const rs = yield apis.updateViewFrontEnd(action.request);
    yield put(updateViewFrontEndSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật view thành công");
      yield put(showFrontEndViewUpdateForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListFrontendView(params));
    }
  } catch (e) {
    yield put(updateViewFrontEndError(new AppError(e.message, -1)));
  }
}
