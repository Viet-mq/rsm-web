import {combineReducers} from "redux";
import reject, {RejectReportState} from "./reject";
import recruitmentActivities, {RecruitmentActivitiesReportState} from "./recruitmentActivities";
import recruitmentEfficiency, {RecruitmentEfficiencyReportState} from "./recruitmentEfficiency";
import recruitmentResult, {RecruitmentResultReportState} from "./recruitmentResult";
import department, {DepartmentReportState} from "./department";

export interface DashBoardModuleState {
  reject: RejectReportState,
  recruitmentActivities:RecruitmentActivitiesReportState,
  recruitmentEfficiency:RecruitmentEfficiencyReportState,
  recruitmentResult:RecruitmentResultReportState,
  department:DepartmentReportState,
}

export default combineReducers<DashBoardModuleState>({
  reject,
  recruitmentActivities,
  recruitmentEfficiency,
  recruitmentResult,
  department,

});
