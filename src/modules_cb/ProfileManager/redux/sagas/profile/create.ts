import {
  CreateProfileAction,
  createProfileError,
  createProfileSuccess,
  getListProfile,
  showFormCreate
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createProfileAsync(action: CreateProfileAction) {
  try {
    const rs = yield apis.createProfile(action.request);
    yield put(createProfileSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Profile không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Profile thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params));

    }
  } catch (e) {
    yield put(createProfileError(new AppError(e.message)));
    NotificationError('Tạo Profile không thành công', "Lỗi: " + e.message);
  }
}
