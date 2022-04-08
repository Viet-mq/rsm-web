import {DeleteProcessAction, deleteProcessError, deleteProcessSuccess} from "../actions";
import * as apis from "../services/apis";
import {put} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";

export function* deleteProcessAsync(action: DeleteProcessAction) {
  try {
    const rs = yield apis.deleteProcess(action.request);
    yield put(deleteProcessSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteProcessError(new AppError(rs.message)));
      NotificationError('Xóa vòng tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa vòng tuyển dụng thành công");
    }
  } catch (e) {
    yield put(deleteProcessError(new AppError(e.message)));
    NotificationError('Xóa vòng tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
