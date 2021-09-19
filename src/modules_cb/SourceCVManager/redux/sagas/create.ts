import {
  CreateSourceCVAction,
  createSourceCVError,
  createSourceCVSuccess,
  getListSourceCV,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createSourceCVAsync(action: CreateSourceCVAction) {
  try {
    const rs = yield apis.createSourceCV(action.request);
    yield put(createSourceCVSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo nguồn CV không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo nguồn CV thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.sourcecvManager.list.params);
      yield put(getListSourceCV(params))
    }
  } catch (e) {
    yield put(createSourceCVError(new AppError(e.message)));
    NotificationError('Tạo nguồn CV không thành công', "Lỗi: " + e.message);
  }
}
