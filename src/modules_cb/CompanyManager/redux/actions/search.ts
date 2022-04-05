import {CompanyEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchCompanyAction {
  type: string,
  params?: any,
  rows?: CompanyEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_COMPANY = "GET_SEARCH_COMPANY";
export const GET_SEARCH_COMPANY_SUCCESS = "GET_SEARCH_COMPANY_SUCCESS";
export const GET_SEARCH_COMPANY_ERROR = "GET_SEARCH_COMPANY_ERROR";

export const getSearchCompany = (params: any): SearchCompanyAction => ({
  type: GET_SEARCH_COMPANY,
  params
});

export const getSearchCompanySuccess = (total: number, rows: CompanyEntity[]): SearchCompanyAction => ({
  type: GET_SEARCH_COMPANY_SUCCESS,
  total,
  rows
});

export const getSearchCompanyError = (error: AppError): SearchCompanyAction => ({
  type: GET_SEARCH_COMPANY_ERROR,
  error
});
