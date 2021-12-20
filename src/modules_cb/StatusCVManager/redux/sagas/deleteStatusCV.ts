import {DeleteStatusCVAction, deleteStatusCVError, deleteStatusCVSuccess, getListStatusCV} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteStatusCVAsync(action: DeleteStatusCVAction) {
  try {
    const rs = yield apis.deleteStatusCV(action.request);
    yield put(deleteStatusCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa quy trình tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa quy trình tuyển dụng thành công");
      const params = yield select((state: RootState) => state.statuscvManager.list.params);
      yield put(getListStatusCV(params))
    }
  } catch (e) {
    yield put(deleteStatusCVError(new AppError(e.message)));
    NotificationError('Xóa quy trình tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
