import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  DeleteMenuFrontendAction,
  deleteMenuFrontendError,
  deleteMenuFrontendSuccess,
  getListMenuFrontend
} from "../../actions";

export function* deleteMenuFrontendAsync(action: DeleteMenuFrontendAction) {
  try {
    let params: any = {"id": action.id};
    const rs = yield apis.deleteMenuFrontend(params);
    yield put(deleteMenuFrontendSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa menu view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa menu view thành công");
      const params = yield select((state: RootState) => state.viewGroupManager.list.params);
      yield put(getListMenuFrontend(params));
    }
  } catch (e) {
    yield put(deleteMenuFrontendError(new AppError(e.message, -1)));
  }
}
