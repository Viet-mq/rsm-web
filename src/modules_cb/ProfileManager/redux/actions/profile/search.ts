import {AppError} from "src/models/common";
import {ProfileEntity, SearchRequest} from "../../../types";

export interface GetElasticSearchAction {
  type: string,
  request?: SearchRequest,
  rowsSearch?: ProfileEntity[],
  rowsRs?: ProfileEntity[],
  total?: number,
  error?: AppError,
}

export const GET_ELASTIC_SEARCH = "GET_ELASTIC_SEARCH";
export const GET_ELASTIC_SEARCH_SUCCESS = "GET_ELASTIC_SEARCH_SUCCESS";
export const GET_ELASTIC_SEARCH_RESULT_SUCCESS = "GET_ELASTIC_SEARCH_RESULT_SUCCESS";
export const GET_ELASTIC_SEARCH_ERROR = "GET_ELASTIC_SEARCH_ERROR";
export const TRIGGER_SEARCH = "TRIGGER_SEARCH";
export const RESET_SEARCH = "RESET_SEARCH";

export const getElasticSearch = (request?: SearchRequest): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH,
  request,
});

export const resetSearch = (request?: SearchRequest): GetElasticSearchAction => ({
  type: RESET_SEARCH,
  request,
});

export const getElasticSearchSuccess = (total: number, rowsSearch?: ProfileEntity[]): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_SUCCESS,
  total,
  rowsSearch:rowsSearch
});

export const getElasticSearchResultSuccess = (total: number, rowsRs?: ProfileEntity[]): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_RESULT_SUCCESS,
  total,
  rowsRs:rowsRs,
});

export const getElasticSearchError = (error: AppError): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_ERROR,
  error
});

export const triggerSearch=():GetElasticSearchAction=>({
  type:TRIGGER_SEARCH,
})
