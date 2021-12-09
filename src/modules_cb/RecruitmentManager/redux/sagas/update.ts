import {getListRecruitment, showFormUpdate, UpdateJobAction, updateJobError, updateJobSuccess} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateJobAsync(action: UpdateJobAction) {
  try {
    const rs = yield apis.updateRecruitment(action.request);
    yield put(updateJobSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật vị trí tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật vị trí tuyển dụng thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.jobManager.list.params);
      yield put(getListRecruitment(params))
    }
  } catch (e) {
    yield put(updateJobError(new AppError(e.message)));
    NotificationError('Cập nhật vị trí tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
