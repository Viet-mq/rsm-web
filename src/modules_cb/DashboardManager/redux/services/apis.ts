import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {EXPORT, GET} from "src/services";
import {
  DepartmentReportEntity,
  RecruitmentActivitiesReportEntity,
  RecruitmentEfficiencyReportEntity,
  RecruitmentResultReportEntity,
  RejectReportEntity
} from "../../types";

export const getDepartmentReport = async (params: any): Promise<ListResponseBase2<DepartmentReportEntity>> => {
  const response = (await GET('api-svc/reportbydepartment/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const getRecruitmentActivitiesReport = async (params: any): Promise<ListResponseBase2<RecruitmentActivitiesReportEntity>> => {
  const response = (await GET('api-svc/reportrecruitmentactivities/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const getRecruitmentEfficiencyReport = async (params: any): Promise<ListResponseBase2<RecruitmentEfficiencyReportEntity>> => {
  const response = (await GET('api-svc/reportrecruitmentefficiency/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const getRecruitmentResultReport = async (params: any): Promise<ListResponseBase2<RecruitmentResultReportEntity>> => {
  const response = (await GET('api-svc/reportrecruitmentresult/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const getRejectReport = async (params: any): Promise<ListResponseBase2<RejectReportEntity>> => {
  const response = (await GET('api-svc/reportrejectprofile/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const exportDepartmentExcelFile = async (params?: any): Promise<ResponseBase2> => {
  return (await EXPORT('api-svc/reportbydepartment/export', params)) as ResponseBase2;
};
