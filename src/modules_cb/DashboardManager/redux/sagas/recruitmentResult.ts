import {RecruitmentResultReportAction, getRecruitmentResultReportError, getRecruitmentResultReportSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getRecruitmentResultReportAsync(action: RecruitmentResultReportAction) {
  try {
    const rs = yield apis.getRecruitmentResultReport(action.params);
    if (rs.code !== 0) {
      yield put(getRecruitmentResultReportError(new AppError(rs.message)));

      NotificationError('Lấy báo cáo kết quả tuyển dụng không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getRecruitmentResultReportSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getRecruitmentResultReportError(new AppError(e.message)));
    NotificationError('Lấy báo cáo kết quả tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
