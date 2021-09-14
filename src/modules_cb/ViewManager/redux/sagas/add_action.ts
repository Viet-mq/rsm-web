import {
  addActionError,
  addActionSuccess,
  AddActionViewAction,
  getListFrontendView,
  showFrontEndViewAddActionForm
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* addActionFrontEndAsync(action: AddActionViewAction) {
  try {
    const rs = yield apis.addActionViewFrontEnd(action.request);
    yield put(addActionSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm action không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm action thành công");
      yield put(showFrontEndViewAddActionForm(false));
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListFrontendView(params));
    }
  } catch (e) {
    yield put(addActionError(new AppError(e.message, -1)));
  }
}
