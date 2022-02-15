import {
  getDetailProfile,
  getListProfile,
  showFormDetail,
  showFormUploadCV,
  UploadCVAction,
  uploadCVError,
  uploadCVSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "../../../../../redux/reducers";
import {DetailCV} from "../../../types";

export function* uploadCVAsync(action: UploadCVAction) {
  try {
    const rs = yield apis.updateCV(action.request?.file, action.request?.profileId);
    yield put(uploadCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tải CV không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tải CV thành công");
      yield put(showFormUploadCV(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params));
      const paramsDetail = yield select((state: RootState) => state.profileManager.detail.params)
      if (paramsDetail?.idProfile) {
        yield put(getDetailProfile(paramsDetail))
      }
    }
  } catch (e) {
    yield put(uploadCVError(new AppError(e.message)));
    NotificationError('Tải CV lên không thành công', "Lỗi: " + e.message);
  }
}
