import {RecruitmentEfficiencyReportEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RecruitmentEfficiencyReportAction {
  type: string,
  params?: any,
  rows?: RecruitmentEfficiencyReportEntity[],
  total?: number,
  error?: AppError
}

export const RECRUITMENT_EFFICIENCY_REPORT = "RECRUITMENT_EFFICIENCY_REPORT";
export const RECRUITMENT_EFFICIENCY_REPORT_SUCCESS = "RECRUITMENT_EFFICIENCY_REPORT_SUCCESS";
export const RECRUITMENT_EFFICIENCY_REPORT_ERROR = "RECRUITMENT_EFFICIENCY_REPORT_ERROR";

export const getRecruitmentEfficiencyReport = (params?: any): RecruitmentEfficiencyReportAction => ({
  type: RECRUITMENT_EFFICIENCY_REPORT,
  params
});

export const getRecruitmentEfficiencyReportSuccess = (total: number, rows: RecruitmentEfficiencyReportEntity[]): RecruitmentEfficiencyReportAction => ({
  type: RECRUITMENT_EFFICIENCY_REPORT_SUCCESS,
  total,
  rows
});

export const getRecruitmentEfficiencyReportError = (error: AppError): RecruitmentEfficiencyReportAction => ({
  type: RECRUITMENT_EFFICIENCY_REPORT_ERROR,
  error
});
