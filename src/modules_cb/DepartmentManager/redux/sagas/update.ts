import {
  getListDepartment,
  showFormUpdate,
  UpdateDepartmentAction,
  updateDepartmentError,
  updateDepartmentSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateDepartmentAsync(action: UpdateDepartmentAction) {
  try {
    const rs = yield apis.updateDepartment(action.request);
    yield put(updateDepartmentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật phòng ban không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật phòng ban thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.departmentManager.list.params);
      yield put(getListDepartment(params))
    }
  } catch (e) {
    yield put(updateDepartmentError(new AppError(e.message)));
    NotificationError('Cập nhật phòng ban không thành công', "Lỗi: " + e.message);
  }
}
