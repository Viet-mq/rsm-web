
import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListGroupAPI, RevokeUserAction, revokeUserError, revokeUserSuccess} from "../../actions";

export function* revokeUserAsync(action: RevokeUserAction) {
  try {
    const rs = yield apis.revokeUser(action.request);
    yield put(revokeUserSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa user role không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa user role thành công");
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(revokeUserError(new AppError(e.message, -1)));
  }
}
