import {AppError, ResponseBase2} from "src/models/common";

export interface GetElasticSearchAction {
  type: string,
  request?: any,
  response?: ResponseBase2,
  error?: AppError
}

export const GET_ELASTIC_SEARCH = "GET_ELASTIC_SEARCH";
export const GET_ELASTIC_SEARCH_SUCCESS = "GET_ELASTIC_SEARCH_SUCCESS";
export const GET_ELASTIC_SEARCH_ERROR = "GET_ELASTIC_SEARCH_ERROR";

export const getElasticSearch = (request: any): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH,
  request
});

export const getElasticSearchSuccess = (response: ResponseBase2): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_SUCCESS,
  response
});

export const getElasticSearchError = (error: AppError): GetElasticSearchAction => ({
  type: GET_ELASTIC_SEARCH_ERROR,
  error
});
