import {DeleteSchoolAction, deleteSchoolError, deleteSchoolSuccess, getListSchool} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteSchoolAsync(action: DeleteSchoolAction) {
  try {
    const rs = yield apis.deleteSchool(action.request);
    yield put(deleteSchoolSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa trường không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa trường thành công");
      const params = yield select((state: RootState) => state.schoolManager.list.params);
      yield put(getListSchool(params))
    }
  } catch (e) {
    yield put(deleteSchoolError(new AppError(e.message)));
    NotificationError('Xóa trường không thành công', "Lỗi: " + e.message);
  }
}
