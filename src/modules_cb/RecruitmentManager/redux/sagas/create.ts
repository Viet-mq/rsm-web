import {
  CreateJobAction,
  createJobError,
  createJobSuccess,
  getListRecruitment,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {createRecruitment} from "../services/apis";

export function* createJobAsync(action: CreateJobAction) {
  try {
    const rs = yield apis.createRecruitment(action.request);
    yield put(createJobSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Job không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Job thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.jobManager.list.params);
      yield put(getListRecruitment(params))
    }
  } catch (e) {
    yield put(createJobError(new AppError(e.message)));
    NotificationError('Tạo Job không thành công', "Lỗi: " + e.message);
  }
}
