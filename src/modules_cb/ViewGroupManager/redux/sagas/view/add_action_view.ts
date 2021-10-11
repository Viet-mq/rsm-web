import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  AddActionViewAction,
  addActionViewError,
  addActionViewSuccess,
  getListMenuFrontend,
  showFormActionView
} from "../../actions";

export function* addActionViewAsync(action: AddActionViewAction) {
  try {
    console.log("action.request:",action.request)
    const rs = yield apis.addActionView(action.request);
    yield put(addActionViewSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm action view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm action view thành công");
      yield put(showFormActionView(false));
      const params = yield select((state: RootState) => state.viewGroupManager.list.params);
      yield put(getListMenuFrontend(params));
    }
  } catch (e) {
    yield put(addActionViewError(new AppError(e.message, -1)));
  }
}
