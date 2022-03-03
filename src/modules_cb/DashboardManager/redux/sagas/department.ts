import {DepartmentReportAction, getDepartmentReportError, getDepartmentReportSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getDepartmentReportAsync(action: DepartmentReportAction) {
  try {
    const rs = yield apis.getDepartmentReport(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy báo cáo tổng hợp nguồn ứng viên bị loại không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getDepartmentReportSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getDepartmentReportError(new AppError(e.message)));
    NotificationError('Lấy báo cáo tổng hợp nguồn ứng viên bị loại không thành công', "Lỗi: " + e.message);
  }
}
