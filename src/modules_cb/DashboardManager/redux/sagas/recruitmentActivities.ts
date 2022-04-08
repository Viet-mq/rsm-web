import {RecruitmentActivitiesReportAction, getRecruitmentActivitiesReportError, getRecruitmentActivitiesReportSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getRecruitmentActivitiesReportAsync(action: RecruitmentActivitiesReportAction) {
  try {
    const rs = yield apis.getRecruitmentActivitiesReport(action.params);
    if (rs.code !== 0) {
      yield put(getRecruitmentActivitiesReportError(new AppError(rs.message)));
      NotificationError('Lấy báo cáo tổng hợp hoạt động tuyển dụng không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getRecruitmentActivitiesReportSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getRecruitmentActivitiesReportError(new AppError(e.message)));
    NotificationError('Lấy báo cáo tổng hợp hoạt động tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
