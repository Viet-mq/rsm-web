import {
  CreateStatusCVAction,
  createStatusCVError,
  createStatusCVSuccess,
  getListStatusCV,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createStatusCVAsync(action: CreateStatusCVAction) {
  try {
    const rs = yield apis.createStatusCV(action.request);
    yield put(createStatusCVSuccess(rs));
    if (rs.code !== 0) {
      yield put(createStatusCVError(new AppError(rs.message)));
      NotificationError('Thêm vòng tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm vòng tuyển dụng thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.statuscvManager.list.params);
      yield put(getListStatusCV(params))
    }
  } catch (e) {
    yield put(createStatusCVError(new AppError(e.message)));
    NotificationError('Thêm vòng tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
