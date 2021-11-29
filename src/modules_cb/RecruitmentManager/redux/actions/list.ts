import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";

export interface RecruitmentListAction {
  type: string,
  params?: any,
  rows?: RecruitmentEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_RECRUITMENT = "GET_LIST_RECRUITMENT";
export const GET_LIST_RECRUITMENT_SUCCESS = "GET_LIST_RECRUITMENT_SUCCESS";
export const GET_LIST_RECRUITMENT_ERROR = "GET_LIST_RECRUITMENT_ERROR";

export const getListRecruitment = (params: any): RecruitmentListAction => ({
  type: GET_LIST_RECRUITMENT,
  params
});

export const getListRecruitmentSuccess = (total: number, rows: RecruitmentEntity[]): RecruitmentListAction => ({
  type: GET_LIST_RECRUITMENT_SUCCESS,
  total,
  rows
});

export const getListRecruitmentError = (error: AppError): RecruitmentListAction => ({
  type: GET_LIST_RECRUITMENT_ERROR,
  error
});
