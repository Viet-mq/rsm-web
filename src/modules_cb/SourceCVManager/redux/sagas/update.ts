import {
  getListSourceCV,
  showFormUpdate,
  UpdateSourceCVAction,
  updateSourceCVError,
  updateSourceCVSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateSourceCVAsync(action: UpdateSourceCVAction) {
  try {
    const rs = yield apis.updateSourceCV(action.request);
    yield put(updateSourceCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật Nguồn ứng viên không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật Nguồn ứng viên thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.sourcecvManager.list.params);
      yield put(getListSourceCV(params))
    }
  } catch (e) {
    yield put(updateSourceCVError(new AppError(e.message)));
    NotificationError('Cập nhật Nguồn ứng viên không thành công', "Lỗi: " + e.message);
  }
}
