import {
  CreateSchoolAction,
  createSchoolError,
  createSchoolSuccess,
  getListSchool,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createSchoolAsync(action: CreateSchoolAction) {
  try {
    const rs = yield apis.createSchool(action.request);
    yield put(createSchoolSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo trường không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo trường thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.schoolManager.list.params);
      yield put(getListSchool(params))
    }
  } catch (e) {
    yield put(createSchoolError(new AppError(e.message)));
    NotificationError('Tạo trường không thành công', "Lỗi: " + e.message);
  }
}
