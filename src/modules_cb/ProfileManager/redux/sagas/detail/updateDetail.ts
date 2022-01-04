import {
  getDetailProfile,
  getListProfile,
  showFormUpdateDetail,
  UpdateDetailAction,
  updateDetailError,
  updateDetailSuccess,
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateDetailAsync(action: UpdateDetailAction) {
  try {

    const rs = yield apis.updateDetail(action.request);
    yield put(updateDetailSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật chi tiết Profile không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật chi tiết Profile thành công");
      yield put(showFormUpdateDetail(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params));
      yield put(getDetailProfile({idProfile:action.request?.id}))
    }
  } catch (e) {
    yield put(updateDetailError(new AppError(e.message)));
    NotificationError('Cập nhật chi tiết Profile không thành công', "Lỗi: " + e.message);
  }
}
