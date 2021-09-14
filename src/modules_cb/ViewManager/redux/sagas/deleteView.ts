import {createDeleteViewError, createDeleteViewSuccess, DeleteViewAction, getListFrontendView} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteFrontEndAsync(action: DeleteViewAction) {
  try {
    let params: any = {"id": action.id};
    const rs = yield apis.deleteViewFrontEnd(params);
    yield put(createDeleteViewSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa view thành công");
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListFrontendView(params));
    }
  } catch (e) {
    yield put(createDeleteViewError(new AppError(e.message, -1)));
  }
}
