import {
  CreateInterviewProcessAction,
  createInterviewProcessError,
  createInterviewProcessSuccess,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";

export function* createInterviewProcessAsync(action: CreateInterviewProcessAction) {
  try {
    const rs = yield apis.createInterviewProcess(action.request);
    yield put(createInterviewProcessSuccess(rs));
    if (rs.code !== 0) {
      yield put(createInterviewProcessError(new AppError(rs.message)));
      NotificationError('Thêm vòng tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm vòng tuyển dụng thành công");
      yield put(showFormCreate(false));
    }
  } catch (e) {
    yield put(createInterviewProcessError(new AppError(e.message)));
    NotificationError('Thêm vòng tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
