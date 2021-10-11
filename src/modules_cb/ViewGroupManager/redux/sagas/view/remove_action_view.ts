import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListMenuFrontend, removeActionError, removeActionSuccess, RemoveActionViewAction} from "../../actions";

export function* removeActionViewAsync(action: RemoveActionViewAction) {
  try {
    const rs = yield apis.removeActionView(action.request);
    yield put(removeActionSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa action view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa action view thành công");
      const params = yield select((state: RootState) => state.viewGroupManager.list.params);
      yield put(getListMenuFrontend(params));
    }
  } catch (e) {
    yield put(removeActionError(new AppError(e.message, -1)));
  }
}
