import {
  DeleteReasonRejectAction,
  deleteReasonRejectError,
  deleteReasonRejectSuccess,
  getListReasonReject,
  searchListReasonReject
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteReasonRejectAsync(action: DeleteReasonRejectAction) {
  try {
    const rs = yield apis.deleteReasonReject(action.request);
    yield put(deleteReasonRejectSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteReasonRejectError(new AppError(rs.message)));
      NotificationError('Xóa lý do loại không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa lý do loại thành công");
      const params = yield select((state: RootState) => state.reasonRejectManager.list.params);
      yield put(getListReasonReject(params))
    }
  } catch (e) {
    yield put(deleteReasonRejectError(new AppError(e.message)));
    NotificationError('Xóa lý do loại không thành công', "Lỗi: " + e.message);
  }
}
