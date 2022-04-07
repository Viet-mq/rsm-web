import {GetListApiAction, searchListApiError, searchListApiSuccess} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {RootState} from "../../../../redux/reducers";
import {getListAccount} from "../../../AccountManager/redux/actions";

export function* searchListApiAsync(action: GetListApiAction) {
  try {
    const rs = yield apis.getListApi(action.params);
    if (rs.code !== 0) {
      yield put(searchListApiError(new AppError(rs.message)));
      NotificationError('Lấy danh sách API không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(searchListApiSuccess(rs.rows, rs.total))
      const params = yield select((state: RootState) => state.accountManager.list.params);
      yield put(getListAccount(params))
    }
  } catch (e) {
    yield put(searchListApiError(new AppError(e.message)));
    NotificationError('Lấy danh sách API không thành công', "Lỗi: " + e.message);
  }
}
