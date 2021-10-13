import {
  getListBlacklist,
  showFormUpdate,
  UpdateBlacklistAction,
  updateBlacklistError,
  updateBlacklistSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateBlacklistAsync(action: UpdateBlacklistAction) {
  try {
    const rs = yield apis.updateBlacklist(action.request);
    yield put(updateBlacklistSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật Blacklist không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật Blacklist thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.blacklistManager.list.params);
      yield put(getListBlacklist(params))
    }
  } catch (e) {
    yield put(updateBlacklistError(new AppError(e.message)));
    NotificationError('Cập nhật Blacklist không thành công', "Lỗi: " + e.message);
  }
}
