import {
  GetCandidatesAction,
  getCandidatesSuccess,
  getScheduleError,
} from "../../actions";

import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";
import {getListProfile} from "../../../../ProfileManager/redux/services/apis";

export function* getCandidatesAsync(action: GetCandidatesAction) {
  try {
    const rs = yield getListProfile(action.params);
    if (rs.code !== 0) {
      yield put(getScheduleError(new AppError(rs.message)));
// NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + rs.message);
    }
    yield put(getCandidatesSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getScheduleError(new AppError(e.message)));
    // NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + e.message);
  }
}
