import {
  GetCandidatesAction, searchCandidatesError,
  searchCandidatesSuccess,
} from "../../actions";

import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";
import {getListProfile} from "../../../../ProfileManager/redux/services/apis";

export function* searchCandidatesAsync(action: GetCandidatesAction) {
  try {
    const rs = yield getListProfile(action.params);
    if (rs.code !== 0) {
      yield put(searchCandidatesError(new AppError(rs.message)));
// NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + rs.message);
    }
    yield put(searchCandidatesSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(searchCandidatesError(new AppError(e.message)));
    // NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + e.message);
  }
}
