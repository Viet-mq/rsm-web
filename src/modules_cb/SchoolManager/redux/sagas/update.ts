import {
  getListSchool,
  showFormUpdate,
  UpdateSchoolAction,
  updateSchoolError,
  updateSchoolSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateSchoolAsync(action: UpdateSchoolAction) {
  try {
    const rs = yield apis.updateSchool(action.request);
    yield put(updateSchoolSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateSchoolError(new AppError(rs.message)));
      NotificationError('Cập nhật trường không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật trường thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.schoolManager.list.params);
      yield put(getListSchool(params))
    }
  } catch (e) {
    yield put(updateSchoolError(new AppError(e.message)));
    NotificationError('Cập nhật trường không thành công', "Lỗi: " + e.message);
  }
}
