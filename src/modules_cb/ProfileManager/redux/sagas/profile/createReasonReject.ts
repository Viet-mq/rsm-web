
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {
  CreateReasonRejectAction,
  createReasonRejectError,
  createReasonRejectSuccess,
  getListProfile, showFormReasonReject
} from "../../actions";

export function* createReasonRejectAsync(action: CreateReasonRejectAction) {
  try {
    const rs = yield apis.createReasonReject(action.request);
    yield put(createReasonRejectSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo lý do từ chối không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo lý do từ chối thành công");
      yield put(showFormReasonReject(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params))
    }
  } catch (e) {
    yield put(createReasonRejectError(new AppError(e.message)));
    NotificationError('Tạo lý do từ chối không thành công', "Lỗi: " + e.message);
  }
}
