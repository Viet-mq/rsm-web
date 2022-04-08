import {RecruitmentEfficiencyReportAction, getRecruitmentEfficiencyReportError, getRecruitmentEfficiencyReportSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getRecruitmentEfficiencyReportAsync(action: RecruitmentEfficiencyReportAction) {
  try {
    const rs = yield apis.getRecruitmentEfficiencyReport(action.params);
    if (rs.code !== 0) {
      yield put(getRecruitmentEfficiencyReportError(new AppError(rs.message)));
      NotificationError('Lấy báo cáo kết quả tin tuyển dụng và hiệu quả nhân sự không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getRecruitmentEfficiencyReportSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getRecruitmentEfficiencyReportError(new AppError(e.message)));
    NotificationError('Lấy báo cáo kết quả tin tuyển dụng và hiệu quả nhân sự không thành công', "Lỗi: " + e.message);
  }
}
