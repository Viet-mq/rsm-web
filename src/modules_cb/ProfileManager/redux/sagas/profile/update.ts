import {
  getListProfile,
  showFormUpdate,
  UpdateProfileAction,
  updateProfileError,
  updateProfileSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateProfileAsync(action: UpdateProfileAction) {
  try {
    const rs = yield apis.updateProfile(action.request);
    yield put(updateProfileSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateProfileError(new AppError(rs.message)));
      NotificationError('Cập nhật ứng viên không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật ứng viên thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);

      yield put(getListProfile(params));
    }
  } catch (e) {
    yield put(updateProfileError(new AppError(e.message)));
    NotificationError('Cập nhật ứng viên không thành công', "Lỗi: " + e.message);
  }
}
