import {RejectReportAction, getRejectReportError, getRejectReportSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getRejectReportAsync(action: RejectReportAction) {
  try {
    const rs = yield apis.getRejectReport(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy báo cáo ứng viên bị loại không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getRejectReportSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getRejectReportError(new AppError(e.message)));
    NotificationError('Lấy báo cáo ứng viên bị loại không thành công', "Lỗi: " + e.message);
  }
}
