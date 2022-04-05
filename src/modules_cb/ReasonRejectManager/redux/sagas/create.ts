import {
  CreateReasonRejectAction,
  createReasonRejectError,
  createReasonRejectSuccess,
  getListReasonReject,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createReasonRejectAsync(action: CreateReasonRejectAction) {
  try {
    const rs = yield apis.createReasonReject(action.request);
    yield put(createReasonRejectSuccess(rs));
    if (rs.code !== 0) {
      yield put(createReasonRejectError(new AppError(rs.message)));
      NotificationError('Tạo lý do loại không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo lý do loại thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.reasonRejectManager.list.params);
      yield put(getListReasonReject(params))
    }
  } catch (e) {
    yield put(createReasonRejectError(new AppError(e.message)));
    NotificationError('Tạo lý do loại không thành công', "Lỗi: " + e.message);
  }
}
