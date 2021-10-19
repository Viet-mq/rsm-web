import {
  getListProfile,
  showFormUploadListCV,
  UploadListCVAction,
  uploadListCVError,
  uploadListCVSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "../../../../../redux/reducers";

export function* uploadListCVAsync(action: UploadListCVAction) {
  try {
    const rs = yield apis.uploadListCV(action.request?.file);
    yield put(uploadListCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tải danh sách CV không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tải danh sách CV thành công");
      yield put(showFormUploadListCV(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params));

    }
  } catch (e) {
    yield put(uploadListCVError(new AppError(e.message)));
    NotificationError('Tải danh sách CV lên không thành công', "Lỗi: " + e.message);
  }
}
