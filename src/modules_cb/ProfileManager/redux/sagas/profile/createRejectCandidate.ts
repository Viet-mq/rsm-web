
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  CreateRejectCandidateAction,
  createRejectCandidateError,
  createRejectCandidateSuccess,
  getListProfile, showFormReasonReject
} from "../../actions";

export function* createRejectCandidateAsync(action: CreateRejectCandidateAction) {
  try {
    const rs = yield apis.createRejectCandidate(action.request);
    yield put(createRejectCandidateSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo lý do loại không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo lý do loại thành công");
      yield put(showFormReasonReject(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params))
    }
  } catch (e) {
    yield put(createRejectCandidateError(new AppError(e.message)));
    NotificationError('Tạo lý do loại không thành công', "Lỗi: " + e.message);
  }
}
