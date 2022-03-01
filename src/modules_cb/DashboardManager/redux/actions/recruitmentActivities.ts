import {RecruitmentActivitiesReportEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RecruitmentActivitiesReportAction {
  type: string,
  params?: any,
  rows?: RecruitmentActivitiesReportEntity[],
  total?: number,
  error?: AppError
}

export const RECRUITMENT_ACTIVITIES_REPORT = "RECRUITMENT_ACTIVITIES_REPORT";
export const RECRUITMENT_ACTIVITIES_REPORT_SUCCESS = "RECRUITMENT_ACTIVITIES_REPORT_SUCCESS";
export const RECRUITMENT_ACTIVITIES_REPORT_ERROR = "RECRUITMENT_ACTIVITIES_REPORT_ERROR";

export const getRecruitmentActivitiesReport = (params?: any): RecruitmentActivitiesReportAction => ({
  type: RECRUITMENT_ACTIVITIES_REPORT,
  params
});

export const getRecruitmentActivitiesReportSuccess = (total: number, rows: RecruitmentActivitiesReportEntity[]): RecruitmentActivitiesReportAction => ({
  type: RECRUITMENT_ACTIVITIES_REPORT_SUCCESS,
  total,
  rows
});

export const getRecruitmentActivitiesReportError = (error: AppError): RecruitmentActivitiesReportAction => ({
  type: RECRUITMENT_ACTIVITIES_REPORT_ERROR,
  error
});
