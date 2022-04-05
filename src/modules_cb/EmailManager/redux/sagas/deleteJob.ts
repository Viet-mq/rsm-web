import {DeleteJobAction, deleteJobError, deleteJobSuccess} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteJobAsync(action: DeleteJobAction) {
  try {
    const rs = yield apis.deleteJob(action.request);
    yield put(deleteJobSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteJobError(new AppError(rs.message)));

      NotificationError('Xóa job không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Job thành công");
      const params = yield select((state: RootState) => state.jobManager.list.params);
      // yield put(getListJob(params))
    }
  } catch (e) {
    yield put(deleteJobError(new AppError(e.message)));
    NotificationError('Xóa Job không thành công', "Lỗi: " + e.message);
  }
}
