import {
  CreateMenuFrontendAction, createMenuFrontEndError, createMenuFrontEndSuccess,
  getListMenuFrontend,
  showFormMenuFrontEndCreate

} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createMenuFrontendAsync(action: CreateMenuFrontendAction) {
  try {
    const rs = yield apis.createMenuFrontend(action.request);
    yield put(createMenuFrontEndSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo menu view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo menu view thành công");
      yield put(showFormMenuFrontEndCreate(false));
      const params = yield select((state: RootState) => state.viewGroupManager.list.params);
      yield put(getListMenuFrontend(params));
    }
  } catch (e) {
    yield put(createMenuFrontEndError(new AppError(e.message, -1)));
  }
}
