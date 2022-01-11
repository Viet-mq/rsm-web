import {AppError} from "src/models/common";
import {ProfileEntity, SearchRequest} from "../../../types";

export interface GetElasticSearchAction {
  type: string,
  request?: SearchRequest,
  requestSearchFull?: SearchRequest,
  rowsSearch?: ProfileEntity[],
  rowsSearchFull?: ProfileEntity[],
  total?: number,
  totalSearchFull?: number,
  error?: AppError,
}

export const GET_ELASTIC_SEARCH = "GET_ELASTIC_SEARCH";
export const GET_FULL_ELASTIC_SEARCH = "GET_FULL_ELASTIC_SEARCH";
export const GET_ELASTIC_SEARCH_SUCCESS = "GET_ELASTIC_SEARCH_SUCCESS";
export const GET_FULL_ELASTIC_SEARCH_SUCCESS = "GET_FULL_ELASTIC_SEARCH_SUCCESS";
export const GET_ELASTIC_SEARCH_ERROR = "GET_ELASTIC_SEARCH_ERROR";
export const RESET_SEARCH = "RESET_SEARCH";

export const getElasticSearch = (request?: SearchRequest): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH,
  request,
});

export const getFullElasticSearch = (requestSearchFull?: SearchRequest): GetElasticSearchAction => ({
  type: GET_FULL_ELASTIC_SEARCH,
  requestSearchFull,
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

export const getFullElasticSearchSuccess = (totalSearchFull: number, rowsSearchFull?: ProfileEntity[]): GetElasticSearchAction => ({
  type: GET_FULL_ELASTIC_SEARCH_SUCCESS,
  totalSearchFull,
  rowsSearchFull:rowsSearchFull,
});

export const getElasticSearchError = (error: AppError): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_ERROR,
  error
});
