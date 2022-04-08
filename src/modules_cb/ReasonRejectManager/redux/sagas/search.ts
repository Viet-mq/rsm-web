import {ReasonRejectListAction, searchListReasonRejectError, searchListReasonRejectSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchListReasonRejectAsync(action: ReasonRejectListAction) {
  try {
    const rs = yield apis.getListReasonReject(action.params);
    if (rs.code !== 0) {
      yield put(searchListReasonRejectError(new AppError(rs.message)));
      NotificationError('Lấy danh sách lý do không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(searchListReasonRejectSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(searchListReasonRejectError(new AppError(e.message)));
    NotificationError('Lấy danh sách lý do không thành công', "Lỗi: " + e.message);
  }
}
