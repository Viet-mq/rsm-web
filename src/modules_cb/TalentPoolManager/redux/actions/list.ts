import {TalentPoolEntity} from "../../types";
import {AppError} from "src/models/common";

export interface TalentPoolListAction {
  type: string,
  params?: any,
  rows?: TalentPoolEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_TALENT_POOL = "GET_LIST_TALENT_POOL";
export const GET_LIST_TALENT_POOL_SUCCESS = "GET_LIST_TALENT_POOL_SUCCESS";
export const GET_LIST_TALENT_POOL_ERROR = "GET_LIST_TALENT_POOL_ERROR";

export const getListTalentPool = (params: any): TalentPoolListAction => ({
  type: GET_LIST_TALENT_POOL,
  params
});

export const getListTalentPoolSuccess = (total: number, rows: TalentPoolEntity[]): TalentPoolListAction => ({
  type: GET_LIST_TALENT_POOL_SUCCESS,
  total,
  rows
});

export const getListTalentPoolError = (error: AppError): TalentPoolListAction => ({
  type: GET_LIST_TALENT_POOL_ERROR,
  error
});
