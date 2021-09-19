import {
  CreateJobAction,
  createJobError,
  createJobSuccess,
  getListJob,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createJobAsync(action: CreateJobAction) {
  try {
    const rs = yield apis.createJob(action.request);
    yield put(createJobSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Job không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Job thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListJob(params))
    }
  } catch (e) {
    yield put(createJobError(new AppError(e.message)));
    NotificationError('Tạo Job không thành công', "Lỗi: " + e.message);
  }
}
