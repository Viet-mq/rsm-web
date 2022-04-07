import {TalentPoolEntity} from "../../types";

import {AppError} from "src/models/common";

export interface SearchTalentPoolAction {
  type: string,
  params?: any,
  rows?: TalentPoolEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_TALENT_POOL = "GET_SEARCH_TALENT_POOL";
export const GET_SEARCH_TALENT_POOL_SUCCESS = "GET_SEARCH_TALENT_POOL_SUCCESS";
export const GET_SEARCH_TALENT_POOL_ERROR = "GET_SEARCH_TALENT_POOL_ERROR";

export const getSearchTalentPool = (params: any): SearchTalentPoolAction => ({
  type: GET_SEARCH_TALENT_POOL,
  params
});

export const getSearchTalentPoolSuccess = (total: number, rows: TalentPoolEntity[]): SearchTalentPoolAction => ({
  type: GET_SEARCH_TALENT_POOL_SUCCESS,
  total,
  rows
});

export const getSearchTalentPoolError = (error: AppError): SearchTalentPoolAction => ({
  type: GET_SEARCH_TALENT_POOL_ERROR,
  error
});
