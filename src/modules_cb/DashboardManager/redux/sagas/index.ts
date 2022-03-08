import {all, takeLatest} from 'redux-saga/effects';
import {getRejectReportAsync} from "./reject";
import {
  DEPARTMENT_DOWNLOAD,
  DEPARTMENT_REPORT,
  RECRUITMENT_ACTIVITIES_REPORT,
  RECRUITMENT_EFFICIENCY_REPORT, RECRUITMENT_RESULT_REPORT,
  REJECT_REPORT
} from "../actions";
import {getDepartmentDownloadAsync, getDepartmentReportAsync} from "./department";
import {getRecruitmentActivitiesReportAsync} from "./recruitmentActivities";
import {getRecruitmentEfficiencyReportAsync} from "./recruitmentEfficency";
import {getRecruitmentResultReportAsync} from "./recruitmentResult";

export default function* root() {
  return all([
    yield takeLatest(REJECT_REPORT, getRejectReportAsync),
    yield takeLatest(DEPARTMENT_REPORT, getDepartmentReportAsync),
    yield takeLatest(DEPARTMENT_DOWNLOAD, getDepartmentDownloadAsync),
    yield takeLatest(RECRUITMENT_ACTIVITIES_REPORT, getRecruitmentActivitiesReportAsync),
    yield takeLatest(RECRUITMENT_EFFICIENCY_REPORT, getRecruitmentEfficiencyReportAsync),
    yield takeLatest(RECRUITMENT_RESULT_REPORT, getRecruitmentResultReportAsync),

  ]);
}
