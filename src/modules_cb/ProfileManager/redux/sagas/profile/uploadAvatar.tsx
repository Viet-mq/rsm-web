import {
  getDetailProfile,
  getListProfile,
  showFormUploadAvatar,
  UploadAvatarAction,
  uploadAvatarError,
  uploadAvatarSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "../../../../../redux/reducers";

export function* uploadAvatarAsync(action: UploadAvatarAction) {
  try {
    const rs = yield apis.uploadAvatar(action.request);
    yield put(uploadAvatarSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật ảnh đại diện không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật ảnh đại diện thành công");
      yield put(showFormUploadAvatar(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params));
      yield put(getDetailProfile({idProfile:action.request?.profileId}));

    }
  } catch (e) {
    yield put(uploadAvatarError(new AppError(e.message)));
    NotificationError('Cập nhật ảnh đại diện lên không thành công', "Lỗi: " + e.message);
  }
}
