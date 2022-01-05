import {SearchUserAction, searchUserError, searchUserSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchUserAsync(action: SearchUserAction) {
  try {
    const rs = yield apis.searchUserRecruitment(action.params);
    if (rs.code !== 0) {
      // NotificationError('Lấy danh sách thành viên không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(searchUserSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(searchUserError(new AppError(e.message)));
    // NotificationError('Lấy danh sách thành viên không thành công', "Lỗi: " + e.message);
  }
}
