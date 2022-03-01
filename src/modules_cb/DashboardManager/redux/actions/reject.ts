import {RejectReportEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RejectReportAction {
  type: string,
  params?: any,
  rows?: RejectReportEntity[],
  total?: number,
  error?: AppError
}

export const REJECT_REPORT = "REJECT_REPORT";
export const REJECT_REPORT_SUCCESS = "REJECT_REPORT_SUCCESS";
export const REJECT_REPORT_ERROR = "REJECT_REPORT_ERROR";

export const getRejectReport = (params?: any): RejectReportAction => ({
  type: REJECT_REPORT,
  params
});

export const getRejectReportSuccess = (total: number, rows: RejectReportEntity[]): RejectReportAction => ({
  type: REJECT_REPORT_SUCCESS,
  total,
  rows
});

export const getRejectReportError = (error: AppError): RejectReportAction => ({
  type: REJECT_REPORT_ERROR,
  error
});
