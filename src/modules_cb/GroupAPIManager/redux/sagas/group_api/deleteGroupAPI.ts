import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {DeleteGroupAPIAction, deleteViewError, deleteViewSuccess, getListGroupAPI} from "../../actions";

export function* deleteGroupAPIAsync(action: DeleteGroupAPIAction) {
  try {
    let params: any = {"id": action.id};
    const rs = yield apis.deleteGroupAPI(params);
    yield put(deleteViewSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa group API không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa group API thành công");
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(deleteViewError(new AppError(e.message, -1)));
  }
}
