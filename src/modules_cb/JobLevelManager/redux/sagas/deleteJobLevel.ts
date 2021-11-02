import {DeleteJobLevelAction, deleteJobLevelError, deleteJobLevelSuccess, getListJobLevel} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteJobLevelAsync(action: DeleteJobLevelAction) {
  try {
    const rs = yield apis.deleteJobLevel(action.request);
    yield put(deleteJobLevelSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa vị trí tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa vị trí tuyển dụng thành công");
      const params = yield select((state: RootState) => state.joblevelManager.list.params);
      yield put(getListJobLevel(params))
    }
  } catch (e) {
    yield put(deleteJobLevelError(new AppError(e.message)));
    NotificationError('Xóa vị trí tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
