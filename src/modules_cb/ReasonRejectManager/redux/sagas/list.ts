import {
  ReasonRejectListAction,
  getListReasonRejectError,
  getListReasonRejectSuccess,
  searchListReasonReject
} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListReasonRejectAsync(action: ReasonRejectListAction) {
  try {
    const rs = yield apis.getListReasonReject(action.params);
    if (rs.code !== 0) {
      yield put(getListReasonRejectError(new AppError(rs.message)));
      NotificationError('Lấy danh sách lý do không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-reason-reject", JSON.stringify(rs || {}));
      yield put(getListReasonRejectSuccess(rs.total, rs.rows))
      yield put(searchListReasonReject(action.params))

    }
  } catch (e) {
    yield put(getListReasonRejectError(new AppError(e.message)));
    NotificationError('Lấy danh sách lý do không thành công', "Lỗi: " + e.message);
  }
}
