import {
  CreateBlacklistAction,
  createBlacklistError,
  createBlacklistSuccess,
  getListBlacklist,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createBlacklistAsync(action: CreateBlacklistAction) {
  try {
    const rs = yield apis.createBlacklist(action.request);
    yield put(createBlacklistSuccess(rs));
    if (rs.code !== 0) {
      yield put(createBlacklistError(new AppError(rs.message)));

      NotificationError('Tạo Blacklist không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Blacklist thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.blacklistManager.list.params);
      yield put(getListBlacklist(params))
    }
  } catch (e) {
    yield put(createBlacklistError(new AppError(e.message)));
    NotificationError('Tạo Blacklist không thành công', "Lỗi: " + e.message);
  }
}
