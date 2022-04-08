import {
  getListStatusCV,
  showFormUpdate,
  UpdateStatusCVAction,
  updateStatusCVError,
  updateStatusCVSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateStatusCVAsync(action: UpdateStatusCVAction) {
  try {
    const rs = yield apis.updateStatusCV(action.request);
    yield put(updateStatusCVSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateStatusCVError(new AppError(rs.message)));
      NotificationError('Cập nhật quy trình tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật quy trình tuyển dụng thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.statuscvManager.list.params);
      yield put(getListStatusCV(params))
    }
  } catch (e) {
    yield put(updateStatusCVError(new AppError(e.message)));
    NotificationError('Cập nhật quy trình tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
