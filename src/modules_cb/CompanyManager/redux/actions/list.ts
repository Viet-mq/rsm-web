import {CompanyEntity} from "../../types";
import {AppError} from "src/models/common";

export interface CompanyListAction {
  type: string,
  params?: any,
  rows?: CompanyEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_COMPANY = "GET_LIST_COMPANY";
export const GET_LIST_COMPANY_SUCCESS = "GET_LIST_COMPANY_SUCCESS";
export const GET_LIST_COMPANY_ERROR = "GET_LIST_COMPANY_ERROR";

export const getListCompany = (params: any): CompanyListAction => ({
  type: GET_LIST_COMPANY,
  params
});

export const getListCompanySuccess = (total: number, rows: CompanyEntity[]): CompanyListAction => ({
  type: GET_LIST_COMPANY_SUCCESS,
  total,
  rows
});

export const getListCompanyError = (error: AppError): CompanyListAction => ({
  type: GET_LIST_COMPANY_ERROR,
  error
});
