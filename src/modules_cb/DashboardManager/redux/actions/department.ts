import {DepartmentReportEntity} from "../../types";
import {AppError} from "src/models/common";

export interface DepartmentReportAction {
  type: string,
  params?: any,
  rows?: DepartmentReportEntity[],
  total?: number,
  error?: AppError
}

export const DEPARTMENT_REPORT = "DEPARTMENT_REPORT";
export const DEPARTMENT_REPORT_SUCCESS = "DEPARTMENT_REPORT_SUCCESS";
export const DEPARTMENT_REPORT_ERROR = "DEPARTMENT_REPORT_ERROR";
export const DEPARTMENT_DOWNLOAD = "DEPARTMENT_DOWNLOAD";

export const getDepartmentReport = (params?: any): DepartmentReportAction => ({
  type: DEPARTMENT_REPORT,
  params
});

export const getDepartmentReportSuccess = (total: number, rows: DepartmentReportEntity[]): DepartmentReportAction => ({
  type: DEPARTMENT_REPORT_SUCCESS,
  total,
  rows
});

export const getDepartmentReportError = (error: AppError): DepartmentReportAction => ({
  type: DEPARTMENT_REPORT_ERROR,
  error
});

export const getDepartmentDownload = (): DepartmentReportAction => ({
  type: DEPARTMENT_DOWNLOAD,
});
