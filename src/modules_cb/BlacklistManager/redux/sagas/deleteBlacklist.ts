import {DeleteBlacklistAction, deleteBlacklistError, deleteBlacklistSuccess, getListBlacklist} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteBlacklistAsync(action: DeleteBlacklistAction) {
  try {
    const rs = yield apis.deleteBlacklist(action.request);
    yield put(deleteBlacklistSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa Blacklist không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Blacklist thành công");
      const params = yield select((state: RootState) => state.blacklistManager.list.params);
      yield put(getListBlacklist(params))
    }
  } catch (e) {
    yield put(deleteBlacklistError(new AppError(e.message)));
    NotificationError('Xóa Blacklist không thành công', "Lỗi: " + e.message);
  }
}
