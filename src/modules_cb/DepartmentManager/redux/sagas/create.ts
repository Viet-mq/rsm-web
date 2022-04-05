import {
  CreateDepartmentAction,
  createDepartmentError,
  createDepartmentSuccess,
  getListDepartment,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createDepartmentAsync(action: CreateDepartmentAction) {
  try {
    const rs = yield apis.createDepartment(action.request);
    yield put(createDepartmentSuccess(rs));
    if (rs.code !== 0) {
          yield put(createDepartmentError(new AppError(rs.message)));

      NotificationError('Tạo phòng ban không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo phòng ban thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.departmentManager.list.params);
      yield put(getListDepartment(params))
    }
  } catch (e) {
    yield put(createDepartmentError(new AppError(e.message)));
    NotificationError('Tạo phòng ban không thành công', "Lỗi: " + e.message);
  }
}
