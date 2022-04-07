import {deleteViewError, deleteViewSuccess, DeleteViewAction, getListView, searchListView} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteViewAsync(action: DeleteViewAction) {
  try {
    let params: any = {"id": action.id};
    const rs = yield apis.deleteView(params);
    yield put(deleteViewSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteViewError(new AppError(rs.message, -1)));
      NotificationError('Xóa view không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa view thành công");
      const params = yield select((state: RootState) => state.viewManager.list.params);
      yield put(getListView(params));
    }
  } catch (e) {
    yield put(deleteViewError(new AppError(e.message, -1)));
  }
}
