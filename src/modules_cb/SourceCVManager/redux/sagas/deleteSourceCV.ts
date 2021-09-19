import {DeleteSourceCVAction, deleteSourceCVError, deleteSourceCVSuccess, getListSourceCV} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteSourceCVAsync(action: DeleteSourceCVAction) {
  try {
    const rs = yield apis.deleteSourceCV(action.request);
    yield put(deleteSourceCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa nguồn CV không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa nguồn CV thành công");
      const params = yield select((state: RootState) => state.sourcecvManager.list.params);
      yield put(getListSourceCV(params))
    }
  } catch (e) {
    yield put(deleteSourceCVError(new AppError(e.message)));
    NotificationError('Xóa nguồn CV không thành công', "Lỗi: " + e.message);
  }
}
