import {RecruitmentResultReportEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RecruitmentResultReportAction {
  type: string,
  params?: any,
  rows?: RecruitmentResultReportEntity[],
  total?: number,
  error?: AppError
}

export const RECRUITMENT_RESULT_REPORT = "RECRUITMENT_RESULT_REPORT";
export const RECRUITMENT_RESULT_REPORT_SUCCESS = "RECRUITMENT_RESULT_REPORT_SUCCESS";
export const RECRUITMENT_RESULT_REPORT_ERROR = "RECRUITMENT_RESULT_REPORT_ERROR";

export const getRecruitmentResultReport = (params?: any): RecruitmentResultReportAction => ({
  type: RECRUITMENT_RESULT_REPORT,
  params
});

export const getRecruitmentResultReportSuccess = (total: number, rows: RecruitmentResultReportEntity[]): RecruitmentResultReportAction => ({
  type: RECRUITMENT_RESULT_REPORT_SUCCESS,
  total,
  rows
});

export const getRecruitmentResultReportError = (error: AppError): RecruitmentResultReportAction => ({
  type: RECRUITMENT_RESULT_REPORT_ERROR,
  error
});
