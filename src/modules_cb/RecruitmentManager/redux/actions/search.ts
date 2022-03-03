import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchRecruitmentAction {
  type: string,
  params?: any,
  rows?: RecruitmentEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_RECRUITMENT = "GET_SEARCH_RECRUITMENT";
export const GET_SEARCH_RECRUITMENT_SUCCESS = "GET_SEARCH_RECRUITMENT_SUCCESS";
export const GET_SEARCH_RECRUITMENT_ERROR = "GET_SEARCH_RECRUITMENT_ERROR";

export const getSearchRecruitment = (params?: any): SearchRecruitmentAction => ({
  type: GET_SEARCH_RECRUITMENT,
  params
});

export const getSearchRecruitmentSuccess = (total: number, rows: RecruitmentEntity[]): SearchRecruitmentAction => ({
  type: GET_SEARCH_RECRUITMENT_SUCCESS,
  total,
  rows
});

export const getSearchRecruitmentError = (error: AppError): SearchRecruitmentAction => ({
  type: GET_SEARCH_RECRUITMENT_ERROR,
  error
});
