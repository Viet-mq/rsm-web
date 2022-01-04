import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";

export interface DetailRecruitmentAction {
  type: string,
  params?: any,
  rows?: RecruitmentEntity[],
  total?: number,
  error?: AppError
}

export const GET_DETAIL_RECRUITMENT = "GET_DETAIL_RECRUITMENT";
export const GET_DETAIL_RECRUITMENT_SUCCESS = "GET_DETAIL_RECRUITMENT_SUCCESS";
export const GET_DETAIL_RECRUITMENT_ERROR = "GET_DETAIL_RECRUITMENT_ERROR";

export const getDetailRecruitment = (params?: any): DetailRecruitmentAction => ({
  type: GET_DETAIL_RECRUITMENT,
  params
});

export const getDetailRecruitmentSuccess = (total: number, rows: RecruitmentEntity[]): DetailRecruitmentAction => ({
  type: GET_DETAIL_RECRUITMENT_SUCCESS,
  total,
  rows
});

export const getDetailRecruitmentError = (error: AppError): DetailRecruitmentAction => ({
  type: GET_DETAIL_RECRUITMENT_ERROR,
  error
});
