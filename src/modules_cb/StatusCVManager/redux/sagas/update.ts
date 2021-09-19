import {
  getListJob,
  showFormUpdate,
  UpdateJobAction,
  updateJobError,
  updateJobSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateJobAsync(action: UpdateJobAction) {
  try {
    const rs = yield apis.updateJob(action.request);
    yield put(updateJobSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật tài khoản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật tài khoản thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.jobManager.list.params);
      yield put(getListJob(params))
    }
  } catch (e) {
    yield put(updateJobError(new AppError(e.message)));
    NotificationError('Cập nhật tài khoản không thành công', "Lỗi: " + e.message);
  }
}
