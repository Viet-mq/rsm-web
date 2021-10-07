import {
  getListMenuFrontend,
  showFormMenuFrontEndUpdate,
  UpdateMenuFrontendAction, updateMenuFrontEndError, updateMenuFrontEndSuccess

} from "../../actions";
import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateMenuFrontendAsync(action: UpdateMenuFrontendAction) {
  try {
    const rs = yield apis.updateMenuFrontend(action.request);
    yield put(updateMenuFrontEndSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật menu view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật menu view thành công");
      yield put(showFormMenuFrontEndUpdate(false));
      const params = yield select((state: RootState) => state.viewGroupManager.list.params);
      yield put(getListMenuFrontend(params));
    }
  } catch (e) {
    yield put(updateMenuFrontEndError(new AppError(e.message, -1)));
  }
}
