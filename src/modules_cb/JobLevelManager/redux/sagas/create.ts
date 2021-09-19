import {
  CreateJobLevelAction,
  createJobLevelError,
  createJobLevelSuccess,
  getListJobLevel,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createJobLevelAsync(action: CreateJobLevelAction) {
  try {
    const rs = yield apis.createJobLevel(action.request);
    yield put(createJobLevelSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo job level không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo job level thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.joblevelManager.list.params);
      yield put(getListJobLevel(params))
    }
  } catch (e) {
    yield put(createJobLevelError(new AppError(e.message)));
    NotificationError('Tạo job level không thành công', "Lỗi: " + e.message);
  }
}
