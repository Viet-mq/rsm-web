import {getListFrontendView, removeActionError, removeActionSuccess, RemoveActionViewAction} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* removeActionFrontEndAsync(action: RemoveActionViewAction) {
  try {
    const rs = yield apis.removeActionViewFrontEnd(action.request);
    yield put(removeActionSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa action không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa action thành công");
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListFrontendView(params));
    }
  } catch (e) {
    yield put(removeActionError(new AppError(e.message, -1)));
  }
}
