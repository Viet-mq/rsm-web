import {DeleteDepartmentAction, deleteDepartmentError, deleteDepartmentSuccess, getListDepartment} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteDepartmentAsync(action: DeleteDepartmentAction) {
  try {
    const rs = yield apis.deleteDepartment(action.request);
    yield put(deleteDepartmentSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteDepartmentError(new AppError(rs.message)));

      NotificationError('Xóa phòng ban không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa phòng ban thành công");
      const params = yield select((state: RootState) => state.departmentManager.list.params);
      yield put(getListDepartment(params))
    }
  } catch (e) {
    yield put(deleteDepartmentError(new AppError(e.message)));
    NotificationError('Xóa phòng ban không thành công', "Lỗi: " + e.message);
  }
}
