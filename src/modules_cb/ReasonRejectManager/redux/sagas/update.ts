import {
  getListReasonReject,
  showFormUpdate,
  UpdateReasonRejectAction,
  updateReasonRejectError,
  updateReasonRejectSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateReasonRejectAsync(action: UpdateReasonRejectAction) {
  try {
    const rs = yield apis.updateReasonReject(action.request);
    yield put(updateReasonRejectSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateReasonRejectError(new AppError(rs.message)));
      NotificationError('Cập nhật lý do loại không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật lý do loại thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.reasonRejectManager.list.params);
      yield put(getListReasonReject(params))
    }
  } catch (e) {
    yield put(updateReasonRejectError(new AppError(e.message)));
    NotificationError('Cập nhật lý do loại không thành công', "Lỗi: " + e.message);
  }
}
