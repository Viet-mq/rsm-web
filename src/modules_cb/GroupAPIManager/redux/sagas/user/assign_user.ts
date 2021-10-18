
import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {AssignUserAction, assignUserError, assignUserSuccess, getListGroupAPI, showAssignUserForm} from "../../actions";

export function* assignUserAsync(action: AssignUserAction) {
  try {
    const rs = yield apis.assignUser(action.request);
    yield put(assignUserSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm tài khoản không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm tài khoản thành công");
      yield put(showAssignUserForm(false));
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(assignUserError(new AppError(e.message, -1)));
  }
}
