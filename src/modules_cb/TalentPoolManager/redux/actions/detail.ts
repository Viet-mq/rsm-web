import {TalentPoolEntity} from "../../types";
import {AppError} from "src/models/common";

export interface DetailTalentPoolAction {
  type: string,
  params?: any,
  result?: TalentPoolEntity,
  error?: AppError
}

export const GET_DETAIL_TALENT_POOL = "GET_DETAIL_TALENT_POOL";
export const GET_DETAIL_TALENT_POOL_SUCCESS = "GET_DETAIL_TALENT_POOL_SUCCESS";
export const GET_DETAIL_TALENT_POOL_ERROR = "GET_DETAIL_TALENT_POOL_ERROR";

export const getDetailTalentPool = (params: any): DetailTalentPoolAction => ({
  type: GET_DETAIL_TALENT_POOL,
  params
});

export const getDetailTalentPoolSuccess = (result: TalentPoolEntity): DetailTalentPoolAction => ({
  type: GET_DETAIL_TALENT_POOL_SUCCESS,
  result
});

export const getDetailTalentPoolError = (error: AppError): DetailTalentPoolAction => ({
  type: GET_DETAIL_TALENT_POOL_ERROR,
  error
});
